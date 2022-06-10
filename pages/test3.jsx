import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

export default function CardWithHeightMeasure() {
  let [isActive, setIsActive] = useState(true);
  let [firstElementRef, { height }] = useMeasure();
  let [knownHeight, setKnownHeight] = useState();

  useEffect(() => {
    if (height && isActive) {
      setKnownHeight(height);
    }
  }, [height, isActive]);

  return (
    <div className="flex items-center space-x-12 bg-white">
      <div>
        <div className="w-[512px] rounded border border-gray-200 px-4 py-8 shadow">
          <h2 className="mb-4 text-xl font-medium text-gray-800">
            Smooth height card
          </h2>
          <AnimatePresence initial={false} exitBeforeEnter>
            {isActive ? (
              <motion.div
                key="intro"
                ref={firstElementRef}
                initial="hiding"
                animate="showing"
                exit="hiding"
                variants={{
                  hiding: {
                    opacity: 0,
                    height: "auto",
                  },
                  showing: {
                    opacity: 1,
                    height: knownHeight ? knownHeight : "auto",
                  },
                }}
              >
                <p className="text-gray-700">
                  This card has a lot of text in it, but when you toggle it the
                  new content will be much smaller.
                </p>
                <p className="mt-3 text-gray-700">
                  The height will animate smoothly.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="thankYou"
                initial="hiding"
                animate="showing"
                exit="hiding"
                variants={{
                  hiding: {
                    opacity: 0,
                    height: knownHeight ? knownHeight : "auto",
                  },
                  showing: {
                    opacity: 1,
                    height: "auto",
                  },
                }}
              >
                Ok!
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4">
            <button
              type="button"
              className="inline-flex min-h-[42px] items-center justify-center rounded-md border border-transparent bg-blue-600 px-3 py-1 text-sm font-medium text-white  shadow-sm hover:bg-blue-700 focus:outline-none"
              onClick={() => setIsActive((current) => !current)}
            >
              Toggle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
