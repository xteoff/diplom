function WhatsIn(){
    return(
        <div className="flex flex-col gap-5 justify-center items-center py-8 px-5 lg:px-20">
            <div className="text-4xl text-center font-extralight px-6">
                Что входит в набор
            </div>
            <div className="flex flex-col lg:flex-row justify-center gap-12">

                <div className="flex gap-8 flex-col h-[450px] w-[300px] text-center justify-self-start bg-white text-black p-7
                    border border-solid border-transparent rounded-xl">
                    <div className="h-fit px-9">
                        <img src="/bronze.svg" alt="" />
                    </div>
                    <div className="text-2xl gap-3 font-bold">
                        bronze
                        <div className="text-lg font-extralight">
                            более 100 баллов
                        </div>
                    </div>
                    <div className="flex flex-col text-left px-4 font-normal">
                        <ul>
                            <li>2 пробника тональной основы</li>
                            <li>2 пробника помады</li>
                            <li>1 тушь для ресниц</li>
                            <li>1 румяна</li>
                        </ul>
                    </div>
                </div>
                
                <div className="flex gap-8 flex-col h-[450px] w-[300px] text-center justify-self-start bg-white text-black p-7
                    border border-solid border-transparent rounded-xl">
                    <div className="h-fit px-9">
                        <img src="/silver.svg" alt="" />
                    </div>
                    <div className="text-2xl gap-3 font-bold">
                        silver
                        <div className="text-lg font-extralight">
                            более 250 баллов
                        </div>
                    </div>
                    <div className="flex flex-col text-left px-4 font-normal">
                        <ul>
                            <li>2 пробника тональной основы</li>
                            <li>4 пробника помады</li>
                            <li>1 тушь для ресниц</li>
                            <li>1 румяна</li>
                            <li>1 пудра</li>
                            <li>2 блеска для губ</li>
                        </ul>
                    </div>
                </div>

                <div className="flex gap-8 flex-col h-[450px] w-[300px] text-center justify-self-start bg-white text-black p-7
                    border border-solid border-transparent rounded-xl">
                    <div className="h-fit px-9">
                        <img src="/gold.svg" alt="" />
                    </div>
                    <div className="text-2xl gap-3 font-bold">
                        gold
                        <div className="text-lg font-extralight">
                            более 500 баллов
                        </div>
                    </div>
                    <div className="flex flex-col text-left px-4 font-normal">
                        <ul>
                            <li>1 тональная основа</li>
                            <li>2 помады</li>
                            <li>1 тушь для ресниц</li>
                            <li>1 румяна</li>
                            <li>1 пудра</li>
                            <li>2 блеска для губ</li>
                            <li>1 палетка теней</li>
                            <li>набор кистей</li>
                            <li>зеркало</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhatsIn;