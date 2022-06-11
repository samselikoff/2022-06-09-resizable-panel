import { useState } from "react";

export default function Demo() {
  let [expanded, setExpanded] = useState(false);

  return (
    <div className="flex min-h-screen flex-col p-10 text-zinc-100">
      <div className="mx-auto mt-8 h-full w-full max-w-sm border border-zinc-500 pt-8">
        <h1 className="mb-8 text-center text-3xl font-thin">Hello</h1>
        <div className="mb-8 flex justify-between px-8">
          <button
            className="border px-2 py-1"
            onClick={() => setExpanded(!expanded)}
          >
            Toggle
          </button>
        </div>

        <div className="px-8 pb-8">
          {expanded ? (
            <p>
              Something a bit longer. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Repudiandae modi vel odio.
            </p>
          ) : (
            <p>Something short.</p>
          )}
        </div>
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
