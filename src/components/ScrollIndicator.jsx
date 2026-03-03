export default function ScrollIndicator() {
    return (
        <div className="scroll-indicator flex flex-col items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-teal-500/50">
                Next Section
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-teal-500 to-transparent"></div>
        </div>
    );
}
