import HeroContent from "../molecules/HeroContent";
import SearchBar from "../molecules/SearchBar";
import PopularSearches from "../molecules/PopularSearches";
import Container from "../atoms/Container";

function Hero() {
  return (
    <section className="bg-white">
      <Container className="py-10 lg:py-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Content */}
          <div>
            <HeroContent />

            <div className="mt-8 max-w-2xl">
              <SearchBar value="" onChange={() => {}} onSearch={() => {}} />

              <PopularSearches />
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden min-h-[380px] overflow-hidden rounded-2xl bg-[#031B36] lg:block">
            {/* Decorative glow */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

            {/* Window / Card */}
            <div className="absolute right-8 top-8 h-72 w-64 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>

              <div className="mt-8 space-y-3">
                <div className="h-3 w-24 rounded bg-white/20" />
                <div className="h-2 w-40 rounded bg-white/10" />
                <div className="h-2 w-32 rounded bg-white/10" />

                <div className="mt-6 rounded-lg bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">J</div>

                    <div>
                      <div className="h-2.5 w-24 rounded bg-slate-200" />
                      <div className="mt-2 h-2 w-16 rounded bg-slate-100" />
                    </div>
                  </div>

                  <div className="mt-4 h-2 w-full rounded bg-slate-100" />
                  <div className="mt-2 h-2 w-4/5 rounded bg-slate-100" />

                  <div className="mt-4 flex gap-2">
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] text-blue-600">Full-time</span>

                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] text-slate-500">Remote</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Job Card */}
            <div className="absolute bottom-10 left-8 w-56 rounded-xl border border-white/10 bg-white p-4 shadow-2xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-600">J</div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">Frontend Developer</p>

                    <p className="mt-1 text-xs text-slate-500">JobHunt Tech</p>
                  </div>
                </div>

                <span className="text-slate-400">♡</span>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>Jakarta</span>
                <span>Full-time</span>
              </div>

              <p className="mt-3 text-xs font-semibold text-slate-700">Rp 8jt - 15jt</p>
            </div>

            {/* Text */}
            <div className="absolute bottom-8 right-8 text-right">
              <p className="font-serif text-2xl italic text-white/90">Good People</p>

              <p className="font-serif text-2xl italic text-blue-300">Find Jobs.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
