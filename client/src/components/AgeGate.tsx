import { Embers, FlameFloor } from "@/components/Fire";
import { Lockup } from "@/components/Logo";
import { useEffect, useState } from "react";

const KEY = "gaslight_age_ok";

function readStored(): boolean {
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch {
    // Private mode or storage disabled: ask every visit rather than never.
    return false;
  }
}

/**
 * 21+ gate, as the packaging requires. Sits over the public pages until the
 * visitor answers; the answer is remembered on this device only.
 */
export function AgeGate() {
  const [ok, setOk] = useState(true);
  const [declined, setDeclined] = useState(false);

  useEffect(() => {
    setOk(readStored());
  }, []);

  // The page behind must not scroll while the question is up.
  useEffect(() => {
    if (ok) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [ok]);

  if (ok) return null;

  const confirm = () => {
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {
      /* not stored; they'll be asked again next visit */
    }
    setOk(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-title"
      className="char fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-5"
    >
      <FlameFloor />
      <Embers />
      <div className="panel panel-accent relative w-full max-w-md bg-black/85 px-7 py-9 text-center backdrop-blur-sm sm:px-10">
        <Lockup eager className="mx-auto h-auto w-44" />
        <div className="mx-auto mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-signal text-lg font-extrabold text-black">
          21+
        </div>
        {declined ? (
          <>
            <h1 id="age-title" className="mt-5 text-4xl text-bone">
              This site is for adults
            </h1>
            <p className="mt-3 text-ash">
              You need to be 21 or older to see Gas Light products.
            </p>
            <button
              type="button"
              onClick={() => setDeclined(false)}
              className="btn btn-line mt-7"
            >
              Go back
            </button>
          </>
        ) : (
          <>
            <h1 id="age-title" className="mt-5 text-4xl text-bone">
              Are you 21 or older?
            </h1>
            <p className="mt-3 text-ash">
              Gas Light products are hemp-derived and for adults only.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button type="button" onClick={confirm} className="btn btn-fire">
                Yes, I'm 21 or older
              </button>
              <button
                type="button"
                onClick={() => setDeclined(true)}
                className="btn btn-line"
              >
                No
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
