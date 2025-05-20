function HowItWorks(){
    return(
        <div className="flex flex-col gap-5 justify-center items-center py-8 px-20">
            <div className="text-4xl text-center font-extralight px-6">
                Как это работает
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-12">

                <div className="flex gap-8 flex-col h-[250px] w-[300px] text-center justify-center bg-white text-[rgb(169,96,97)] items-center p-5
                    border border-solid border-transparent rounded-xl">
                    <div className="text-4xl">
                        1
                    </div>
                    <div className="text-2xl">
                        Оформите подписку в профиле
                    </div>
                </div>
                
                <div className="flex gap-7 flex-col h-[250px] w-[300px] text-center justify-center bg-white text-[rgb(169,96,97)] items-center p-5
                    border border-solid border-transparent rounded-xl">
                    <div className="text-4xl">
                        2
                    </div>
                    <div className="text-2xl">
                        Зарабатывайте баллы
                        <div className="text-lg font-extralight text-black">
                            100 р = 1 балл
                        </div>
                    </div>
                    
                </div>

                <div className="flex gap-8 flex-col h-[250px] w-[300px] text-center justify-center bg-white text-[rgb(169,96,97)] items-center p-5
                    border border-solid border-transparent rounded-xl">
                    <div className="text-4xl">
                        3
                    </div>
                    <div className="text-2xl">
                        Ожидайте свой набор
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HowItWorks;