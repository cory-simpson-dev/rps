function Home() {
  return (
    <div className="relative overflow-hidden bg-white h-full">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-9 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full">
          <main className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="sm:text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Real PLUR Life</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl">
                A discussion forum for all those who want to contribute to the global embodiment of peace, love, unity, and respect.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="flex flex-col w-full">
                  <div className="grid card p-4 bg-base-200 rounded-box place-items-center"><span className="font-bold text-primary sm:text-xl md:text-xl">peace</span> a state of mutual harmony between people or groups, especially in personal relations</div> 
                  <div className="divider"></div> 
                  <div className="grid card p-4 bg-base-200 rounded-box place-items-center"><span className="font-bold text-primary sm:text-xl md:text-xl">love</span> unselfish, loyal, and benevolent concern for the good of another</div>
                  <div className="divider"></div> 
                  <div className="grid card p-4 bg-base-200 rounded-box place-items-center"><span className="font-bold text-primary sm:text-xl md:text-xl">unity</span> the quality of being one in spirit, sentiment, and purpose</div> 
                  <div className="divider"></div> 
                  <div className="grid card p-4 bg-base-200 rounded-box place-items-center"><span className="font-bold text-primary sm:text-xl md:text-xl">respect</span> a feeling or understanding that someone or something is important, and should be treated in an appropriate way</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Home