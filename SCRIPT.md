# ========= Step ===========

First attempt is to do something like this.

```jsx
// first attempt
<motion.div animate={{ height: "auto" }} />

// next
<motion.div initial={{height: 0}} animate={{ height: "auto" }} />

<motion.div key={expanded} initial={{height: 0}} animate={{ height: "auto" }} />
```

Can't animate from height auto to height auto. So instead measure div and animate height (removing key).

```jsx
<motion.div
  animate={{ height }}
  transition={{ duration: 1 }}
  className="overflow-hidden"
>
```

Pretty cool! Let's extract a component.

# ========= Step ===========

```jsx
<ResizablePanel>
  {expanded ? (
    <p>
      Something a bit longer. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Repudiandae modi vel odio.
    </p>
  ) : (
    <p>Something short.</p>
  )}
</ResizablePanel>
```

```jsx
function ResizablePanel({ children }) {
  let [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={{ height }}
      transition={{ duration: 1 }}
      className="overflow-hidden"
    >
      <div ref={ref} className="px-8 pb-8">
        {children}
      </div>
    </motion.div>
  );
}
```

# ========= Step ===========

Nice. Now let's work on transitioning the contents.

Wrap children in motion.div. Works on initial but need key.

Could pass in `id={expanded}`. Works. But kinda a bummer.

Try height, we know it's changing.

```jsx
<motion.div key={height} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  <div ref={ref} className="px-8 pb-8">
    {children}
  </div>
</motion.div>
```

But not really natural. Also if height doesn't change, don't transition.

What about an index that increments on renders?

```jsx
let i;
function ResizablePanel({ children }) {
  let [ref, { height }] = useMeasure();
  i++;
  //
  return (
    <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
  );
}
```

Seems ok... but what if we trigger a rerender from elsewhere?

```js
<button className="border px-2 py-1" onClick={() => setFoo(!foo)}>
  Rerender
</button>

<span>Rerender ({foo ? "y" : "n"})</span>
```

So no good.

Well - what is the natural key?

Children.

Can't pass this in bc children recreated each render. So there's no constantacy across renders.

What if we could serialize children?

Circular structure error.

```js
/*
  Replacer function to JSON.stringify that ignores
  circular references and internal React properties.

  https://github.com/facebook/react/issues/8669#issuecomment-531515508
*/
const ignoreCircularReferences = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (key.startsWith("_")) return; // Don't compare React's internal props.
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
};
```

Pretty cool right?

# ========= Step ===========

Let's get exit animations.

```jsx
<AnimatePresence>
  <motion.div
    key={JSON.stringify(children, ignoreCircularReferences())}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  />
</AnimatePresence>
```

Animate presence does have exitBeforeEnter, but not quite right. Let's do better.

Absolute positioning.

```jsx
<motion.div animate={{ height }} className="relative overflow-hidden">
  <AnimatePresence>
    <motion.div
      key={JSON.stringify(children, ignoreCircularReferences())}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute"
    >
      <div ref={ref} className="px-8 pb-8">
        {children}
      </div>
    </motion.div>
  </AnimatePresence>
</motion.div>
```

Boom.

# ========= Step ===========

Let's fix initial render, starting with height. useMeasure takes a frame to measure.

```jsx
<motion.div className={height ? "absolute" : "relative"} />
```

See a little jump. let's make this auto until height is measured.

```jsx
<motion.div
  animate={{ height: height || "auto" }}
  className="relative overflow-hidden"
>
```

Sweet. Now opacity.

# ========= Step ===========

Try out count % 3.

```jsx
<p>
  And something longer. Sed ut perspiciatis unde omnis iste natus error sit
  voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
  quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
  explicabo.
</p>
```

Play with animations.

```jsx
<AnimatePresence initial={false}>
  <motion.div
    key={JSON.stringify(children, ignoreCircularReferences())}
    initial={{
      x: 384,
    }}
    animate={{
      x: 0,
      // transition: { duration: duration / 2, delay: duration / 2 },
    }}
    exit={{
      x: -384,
      // transition: { duration: duration / 2 },
    }}
    className={height ? "absolute" : "relative"}
  >
  </AnimatePresence>
```
