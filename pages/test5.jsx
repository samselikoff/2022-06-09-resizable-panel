import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useMeasure from "react-use-measure";

export default function Test4() {
  let [expand, setExpand] = useState(false);
  let [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen flex-col p-40 text-zinc-100">
      <div className="mx-auto h-full w-full max-w-sm border border-zinc-500 px-8 pt-8">
        <h1 className="mb-8 text-center text-3xl font-thin">Hello</h1>
        <div className="mb-8 flex justify-between">
          <button
            className="border px-2 py-1"
            onClick={() => setExpand(!expand)}
          >
            Toggle
          </button>
          <button
            className="border px-2 py-1"
            onClick={() => setCount(count + 1)}
          >
            Rerender (count: {count})
          </button>
        </div>

        <ResizingPanel>
          {expand === true ? (
            <p>
              And something longer. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Repudiandae modi vel odio, aliquid quibusdam
              voluptate adipisci incidunt a molestiae nobis itaque molestias
              deleniti recusandae nostrum quae voluptatibus dolorem quasi
              tempore?
            </p>
          ) : (
            <p>Something short.</p>
          )}
        </ResizingPanel>
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

let duration = 0.5;

function ResizingPanel({ children }) {
  let [ref, { height }] = useMeasure();

  return (
    <motion.div
      className="relative overflow-hidden"
      animate={{ height: height ? height : "auto" }}
      transition={{ duration }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={JSON.stringify(children, circular())}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: duration / 2, delay: duration / 2 },
          }}
          exit={{ opacity: 0, transition: { duration: duration / 2 } }}
          transition={{ duration }}
          className={height ? "absolute" : "relative"}
        >
          <div ref={ref} className="pb-8">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// https://github.com/facebook/react/issues/8669#issuecomment-531515508
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
