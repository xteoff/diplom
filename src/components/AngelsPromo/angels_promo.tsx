import Link from "next/link";

function AngelsPromo() {
  return (
    <div className="relative overflow-hidden">
      <div className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full">
        <img 
          src="/ang.webp" 
          alt="Little Angel Collection" 
          className="w-full h-full object-cover object-right"
        />
      </div>

      <div className="absolute top-[10%] sm:top-[10%] lg:top-[25%] left-0 w-full px-4 sm:px-10 md:px-20">
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 text-white" 
             style={{ maxWidth: 'calc(100% - 2rem)' }}> 
          
          <div className="text-xl md:text-2xl text-[rgb(169,96,97)] font-bold">
            новая коллекция
          </div>
          
          <div className="text-3xl sm:text-4xl md:text-5xl text-[rgb(135,61,61)] font-bold">
            Little Angel
          </div>
          
          <div className="text-xl sm:text-2xl md:text-3xl font-normal leading-tight">
            Вдохновленная<br />
            прекрасными ангельскими<br />
            созданиями и любовью<br />
            к себе
          </div>
          
          <div className="mt-2 sm:mt-3 md:mt-4 w-fit">
            <Link 
              href="/collections"
              className="inline-block text-xl sm:text-2xl border border-white rounded-full px-5 py-2 sm:px-6 sm:py-3
              hover:bg-[rgb(135,61,61)] hover:border-transparent hover:text-black transition-all duration-300
              whitespace-nowrap"
            >
              Заказать
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AngelsPromo;