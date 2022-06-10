import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

export default function Test1() {
  let [showing, set] = useState(true);

  return (
    <MotionConfig transition={{ duration: 2 }}>
      <div className="p-40 text-white">
        <button onClick={() => set(!showing)}>Click</button>
        <div className="mt-8">
          <motion.div
            // layout
            animate={{ height: "auto" }}
            className="flex overflow-hidden border border-white"
          >
            {showing ? (
              <motion.div
                layoutId="a"
                layout
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="w-20 bg-red-500"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
                suscipit neque id! Tempora magnam deleniti obcaecati voluptatem,
                odio aperiam eos dolores repellendus odit? Quaerat architecto
                corporis perferendis doloremque blanditiis tempore.
              </motion.div>
            ) : (
              <motion.div
                layoutId="a"
                layout
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="w-20 bg-green-500"
              >
                <motion.span layout>something</motion.span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}

let duration = 2;
let variants = {
  hidden: { opacity: 0, height: 0, transition: { duration } },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration },
  },
};
