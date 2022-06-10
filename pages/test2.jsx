import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  let [state, setState] = useState("welcome");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <motion.div className="w-full max-w-md rounded  text-zinc-300">
        <motion.h1 className="mb-8 px-8 pt-8 text-center text-4xl font-thin text-zinc-100">
          Title
        </motion.h1>

        <motion.div
          // initial={{ opacity: 0, height: 0 }}
          // animate={{ opacity: 1, height: "auto" }}
          // animate={{ height: "auto" }}
          // transition={{ duration: 1, delay: 0.5 }}
          className="overflow-hidden"
        >
          <div className="px-8 pb-8">
            <div className="flex justify-between">
              <button onClick={() => setState("welcome")}>Prev</button>
              <button onClick={() => setState("form")}>Next</button>
            </div>

            <motion.div>
              <AnimatePresence initial={false}>
                {state === "welcome" && (
                  <motion.div
                    key="welcome"
                    // initial={{ opacity: 0, height: 0 }}
                    // animate={{ height: "auto" }}
                    // exit={{ height: 0 }}
                    variants={variants}
                    // transition={transition}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    // initial={{ opacity: 0 }}
                    // animate={{ opacity: 1 }}
                    // exit={{ opacity: 0 }}
                    // exit={{ x: -100 }}
                    // initial={{ x: -100 }}
                    // animate={{ x: 0 }}
                    // exit={{ x: -100 }}
                    className=""
                    // transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <p className="pt-4">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Praesentium, soluta voluptates beatae a officiis hic
                      consequatur necessitatibus dolore eum distinctio molestias
                      sint, debitis sequi perferendis inventore dolorem dicta
                      aspernatur quos?
                    </p>
                  </motion.div>
                )}
                {state === "form" && (
                  <motion.div
                    key="form"
                    // initial={{ opacity: 0 }}
                    // animate={{ opacity: 1 }}
                    // exit={{ opacity: 0 }}
                    variants={variants}
                    // transition={transition}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    // initial={{ height: 0 }}
                    // animate={{ height: "auto" }}
                    // exit={{ height: 0 }}
                  >
                    <div className="pt-4">
                      <input type="text" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// let duration = 1;
// let variants = {
//   hidden: {
//     opacity: 0,
//     height: 0,
//     transition: { duration },
//   },
//   visible: {
//     opacity: 1,
//     height: "auto",
//     transition: { duration },
//   },
// };

// Exit leaves first
let duration = 1;
let variants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration, opacity: { duration: duration / 2 } },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration,
      opacity: { delay: duration / 2, duration: duration / 2 },
    },
  },
};
