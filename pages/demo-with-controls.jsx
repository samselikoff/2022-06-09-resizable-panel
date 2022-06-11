import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useMeasure from "react-use-measure";

export default function Test4() {
  let [activeAnimation, setActiveAnimation] = useState("fade");
  let [duration, setDuration] = useState(0.25);
  let [expand, setExpand] = useState(false);
  let [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen flex-col p-10 text-zinc-100">
      <div className="mx-auto w-full max-w-sm">
        <div className="flex justify-between">
          <label>
            fade
            <input
              checked={activeAnimation === "fade"}
              onChange={() => setActiveAnimation("fade")}
              className="ml-1"
              type="radio"
            />
          </label>
          <label>
            crossFade
            <input
              checked={activeAnimation === "crossFade"}
              onChange={() => setActiveAnimation("crossFade")}
              className="ml-1"
              type="radio"
            />
          </label>
          <label>
            slide
            <input
              checked={activeAnimation === "slide"}
              onChange={() => setActiveAnimation("slide")}
              className="ml-1"
              type="radio"
            />
          </label>
          <label>
            slideAndFade
            <input
              checked={activeAnimation === "slideAndFade"}
              onChange={() => setActiveAnimation("slideAndFade")}
              className="ml-1"
              type="radio"
            />
          </label>
        </div>
        <div className="mt-4 flex space-x-4">
          <input
            className="w-full"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            step={0.01}
            min={0}
            max={2}
            type="range"
            name=""
            id=""
          />
          <div className="w-16 text-right tabular-nums">
            {Number.parseFloat(duration).toFixed(2)}
            {" s"}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 h-full w-full max-w-sm border border-zinc-500 pt-8">
        <h1 className="mb-8 text-center text-3xl font-thin">Hello</h1>
        <div className="mb-8 flex justify-between px-8">
          <button
            className="border px-2 py-1"
            onClick={() => setCount(count + 1)}
          >
            Increment ({count})
          </button>
          <button
            className="border px-2 py-1"
            onClick={() => setExpand(!expand)}
          >
            Rerender ({expand ? "y" : "n"})
          </button>
        </div>

        <ResizablePanel animationName={activeAnimation} duration={duration}>
          {count % 3 === 0 ? (
            <p>Something short.</p>
          ) : count % 3 === 1 ? (
            <p>
              Something a bit longer. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Repudiandae modi vel odio.
            </p>
          ) : (
            <p>
              And something longer. Sed ut perspiciatis unde omnis iste natus
              error sit voluptatem accusantium doloremque laudantium, totam rem
              aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo.
            </p>
          )}
        </ResizablePanel>
      </div>

      <div className="mx-auto mt-16 max-w-md">
        <p>
          Some other content. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Eveniet distinctio voluptatum dolore, nobis debitis
          sequi error nisi! Eveniet consectetur consequatur, vero sint doloribus
          ducimus laudantium officiis nam recusandae soluta aliquam?
        </p>
      </div>
    </div>
  );
}

function ResizablePanel({ children, animationName, duration }) {
  let [ref, { height }] = useMeasure();

  let animations = {
    fade: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: { duration: duration / 2, delay: duration / 2 },
      },
      exit: { opacity: 0, transition: { duration: duration / 2 } },
    },

    crossFade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },

    slide: {
      initial: { x: 382 },
      animate: { x: 0 },
      exit: { x: -382 },
    },

    slideAndFade: {
      initial: { x: 382, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -382, opacity: 0 },
    },
  };

  return (
    <motion.div
      className="relative overflow-hidden"
      animate={{ height: height || "auto" }}
      transition={{ duration }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={JSON.stringify(children, circular())}
          {...animations[animationName]}
          transition={{ duration }}
          className={height ? "absolute" : "relative"}
        >
          <div ref={ref} className="px-8 pb-8">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/*
  Replacer function to JSON.stringify that ignores
  circular references and internal React properties.

  https://github.com/facebook/react/issues/8669#issuecomment-531515508
*/
const circular = () => {
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
