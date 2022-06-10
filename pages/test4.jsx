import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useMeasure from "react-use-measure";

export default function Test4() {
  let [activePanel, setActivePanel] = useState(true);

  return (
    <div className="flex min-h-screen flex-col p-40 text-zinc-100">
      <div className="mx-auto h-full w-full max-w-sm border border-zinc-500 px-8 pt-8">
        <h1 className="mb-4 text-center text-3xl font-thin">Hello</h1>
        <div>
          <button
            className="mb-4 border px-2 py-1"
            onClick={() => setActivePanel(!activePanel)}
          >
            Change
          </button>
        </div>
        <ResizingPanel id={activePanel ? "a" : "b"}>
          {activePanel === true ? (
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae modi vel odio, aliquid quibusdam voluptate adipisci
              incidunt a molestiae nobis itaque molestias deleniti recusandae
              nostrum quae voluptatibus dolorem quasi tempore?
            </p>
          ) : (
            <p>Poopy</p>
          )}
        </ResizingPanel>

        {/* <motion.div
          className="relative overflow-hidden"
          animate={{ height }}
          transition={{ duration }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={activePanel ? "a" : "b"}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: duration / 2, delay: duration / 2 },
              }}
              exit={{ opacity: 0, transition: { duration: duration / 2 } }}
              transition={{ duration }}
              className="absolute"
            >
              <div ref={ref} className="pb-8">
                {activePanel === true ? (
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repudiandae modi vel odio, aliquid quibusdam voluptate
                    adipisci incidunt a molestiae nobis itaque molestias
                    deleniti recusandae nostrum quae voluptatibus dolorem quasi
                    tempore?
                  </p>
                ) : (
                  <p>Poopy</p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div> */}
      </div>
      <div className="mt-8">
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

function ResizingPanel({ id, children }) {
  let [ref, { height }] = useMeasure();

  return (
    <motion.div
      className="relative overflow-hidden"
      animate={{ height }}
      transition={{ duration }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: duration / 2, delay: duration / 2 },
          }}
          exit={{ opacity: 0, transition: { duration: duration / 2 } }}
          transition={{ duration }}
          className="absolute"
        >
          <div ref={ref} className="pb-8">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
