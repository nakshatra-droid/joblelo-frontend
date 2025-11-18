export default function HeroSection() {
    return (
        <section className="flex flex-col items-center text-center px-8 py-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
                FIND YOUR DREAM JOB TODAY
            </h2>
            <p className="text-gray-500 text-lg mt-4 max-w-2xl">
                Connecting Talent with Opportunities Across the Nation for Every Skill Level
            </p>
            <div className="mt-10 bg-yellow-400 max-w-3xl p-8 rounded-2xl shadow-sm text-gray-900 text-lg leading-relaxed">
                Explore a vast array of job listings in diverse industries. Whether you're a seasoned
                professional or just starting out, find the perfect role to advance your career. Our
                platform makes job searching easy and efficient, bringing you closer to your next big
                opportunity.
            </div>
        </section>
    );
}