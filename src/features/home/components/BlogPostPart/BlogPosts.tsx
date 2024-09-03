import BlogPost from "../../../../config/BlogPostPart.json";

export default function BlogPosts() {
  return (
    <div className="flex flex-col gap-y-7 relative py-5">
      <div className="flex flex-row justify-between items-center">
        <h1 className="m-0 md:text-2xl xs:text-base font-semibold">Blog Post</h1>
        <button className="m-0 md:text-xl xs:text-base text-anchor">See All</button>
      </div>
      <div className="relative flex flex-col md:gap-x-5 xs:gap-x-5 md:px-2 xs:px-1">
        <div className="flex xs:flex-col xl:flex-row gap-y-4 md:gap-x-2 xs:gap-x-5 pb-4">
          <div className="xs:rounded-2xl flex gap-x-8 md:rounded-xl inset-0">
            <div className="rounded  xs:w-full xs:h-[37vh] md:h-[50vh] xl:h-[653px] 2xl:w-[38vw]
             xl:w-[35rem] sm:w-[41rem] lg:w-[98vw] md:w-[97vw] flex flex-col gap-y-5">
              <div className="w-full cursor-pointer xs:h-full xl:h-full relative">
                <img
                  className="md:rounded-2xl w-full h-full xs:rounded-2xl object-fill"
                  src={BlogPost.featuredPost.imageUrl}
                />
                <div className="absolute rounded-2xl inset-0 bg-black opacity-50"></div>
                <div className="absolute w-full xs:top-28 md:top-52 bg-opacity-50 text-white flex flex-col items-center justify-center">
                  <div className="p-2 md:w-4/5 flex flex-col items-center justify-center gap-y-3">
                    <h1 className="xs:text-xl md:text-3xl font-bold">{BlogPost.featuredPost.title}</h1>
                    <p className="text-center xs:text-sm  md:text-base font-semibold">
                      {BlogPost.featuredPost.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pb-8 xs:overflow-x-auto xl:overflow-visible gap-x-2 gap-y-4  flex xl:grid xs:flex-row xl:grid-cols-2 xs:h-[22rem] xl:h-[42rem]">
            {BlogPost.blogPosts.map((post, index) => (
              <div key={index} className="border xs:min-w-64 
               md:min-w-72   xl:min-w-60 bg-white border-gray-200 shadow rounded-xl">
                <img
                  className="md:rounded-t-xl md:rounded-tr-xl md:rounded-sm xs:rounded-2xl md:w-full md:h-[168px] xs:w-64 md xs:h-44 object-cover"
                  src={post.imageUrl}
                  alt={post.title}
                />
                <div className="px-4 py-2 flex flex-col xs:gap-y-3 md:gap-y-2 items-start bg-white rounded-b-xl rounded-bl-xl">
                  <p className="xs:text-xs md:text-sm">Read</p>
                  <h1 className="xs:text-sm md:text-base lg:text-xl">{post.title}</h1>
                  <p className="xs:text-xs xl:text-sm break-all line-clamp-2 text-gray-500">
                    {post.description}
                  </p>
                  <button className="xs:text-xs md:text-sm">Read More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
