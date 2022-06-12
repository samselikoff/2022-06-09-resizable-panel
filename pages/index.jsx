import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";

let duration = 0.25;

export default function Demo() {
  let [foo, setFoo] = useState(false);
  let [count, setCount] = useState(0);

  return (
    <MotionConfig transition={{ duration }}>
      <div className="flex min-h-screen flex-col p-10 text-zinc-100">
        <div className="mx-auto mt-8 h-full w-full max-w-sm border border-zinc-500 pt-8">
          <h1 className="mb-8 text-center text-3xl font-thin">Hello</h1>
          <div className="mb-8 flex justify-between px-8">
            <button
              className="border px-2 py-1"
              onClick={() => setCount(count + 1)}
            >
              Toggle
            </button>
            <button className="border px-2 py-1" onClick={() => setFoo(!foo)}>
              Rerender ({foo ? "y" : "n"})
            </button>
          </div>

          <ResizablePanel>
            {count % 3 === 2 ? (
              <p>
                And something longer. Sed ut perspiciatis unde omnis iste natus
                error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et
                quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            ) : count % 3 === 1 ? (
              <p>
                Something a bit longer. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Repudiandae modi vel odio.
              </p>
            ) : (
              <p>Something short.</p>
            )}
          </ResizablePanel>
        </div>

        <div className="mx-auto mt-16 max-w-md">
          <p>
            Some other content. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Eveniet distinctio voluptatum dolore, nobis
            debitis sequi error nisi! Eveniet consectetur consequatur, vero sint
            doloribus ducimus laudantium officiis nam recusandae soluta aliquam?
          </p>
        </div>
      </div>
    </MotionConfig>
  );
}

function ResizablePanel({ children }) {
  let [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={{ height: height || "auto" }}
      className="relative overflow-hidden"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={JSON.stringify(children, ignoreCircularReferences())}
          initial={{
            // opacity: 0,
            x: 382,
          }}
          animate={{
            // opacity: 1,
            x: 0,
            // transition: { duration: duration / 2, delay: duration / 2 },
          }}
          exit={{
            // opacity: 0,
            x: -382,
            // transition: { duration: duration / 2 }
          }}
        >
          <div
            ref={ref}
            className={`${height ? "absolute" : "relative"} px-8 pb-8`}
          >
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
