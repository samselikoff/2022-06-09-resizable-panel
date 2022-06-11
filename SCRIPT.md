```jsx
<p>
  And something longer. Sed ut perspiciatis unde omnis iste natus error sit
  voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
  quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
  explicabo.
</p>
```

```js
let [count, setCount] = useState(0);
```

```jsx
<button className="border px-2 py-1" onClick={() => setCount(count + 1)}>
  Increment ({count})
</button>
```

```js
let [on, setOn] = useState(false);
```

```jsx
<button className="border px-2 py-1" onClick={() => setOn(!on)}>
  Rerender ({on ? "y" : "n"})
</button>
```
