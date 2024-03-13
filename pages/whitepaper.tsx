import Container from '../components/Container';
import Router from 'next/router';

export default function Whitepaper() {
  return (
    <Container
      title="Content Whitepaper - Disperse"
      description="Learn how to go viral with content marketing. From 0 to 10K customrs from organic content."
    >
      <div className="flex pb-28 pt-16 flex-col justify-center items-center w-full">
        <section
          id="header"
          className="w-[95%] sm:w-4/5 md:w-3/5 2xl:w-1/2 flex flex-col justify-center items-center"
        >
          <h1 className="text-4xl md:text-5xl xl:text-6xl text-center text-[#363636] silka-bold">
            How to Go Viral With Content Marketing
          </h1>
          <p className="mt-7 silka-semibold text-center text-base md:text-lg xl:text-xl text-gray-700">
            From 0 to 10K customers from organic content.
          </p>
          <p className="mt-4 silka-regular italic text-xs md:text-sm text-center text-gray-500">
            "If you spend 1-hour making content, you should spend at
            least 1-hour marketing it."
          </p>
        </section>
        <section
          id="main"
          className="w-[90%] sm:w-4/5 lg:w-1/2 2xl:w-2/5 flex flex-col justify-start item-start"
        >
          <h2 className="text-3xl md:text-4xl mt-16 md:mt-24 silka-semibold text-gray-900">
            Preface
          </h2>
          <p className="mt-5 silka-regular text-gray-500">
            The key to going viral is understanding the algorithm.
            This is what will be explained in the preface.
          </p>
          <h3 className="text-xl md:text-2xl mt-8 silka-semibold text-[#363636]">
            Motivation
          </h3>
          <p className="mt-5 silka-regular text-gray-500">
            What is the TikTok's motivation? What is YouTube's
            motivation? Why would they rank one video higher than the
            other? Well, that&apos;s simple, the goal of any company
            is to maximize shareholder value. They want to make{' '}
            <span className="silka-semibold text-gray-900">
              MORE MONEY.
            </span>
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            In order for us to go viral, we must align our interests
            with theirs.
          </p>
          <h3 className="text-xl md:text-2xl mt-8 silka-semibold text-[#363636]">
            How Advertiser Led Companies Work
          </h3>
          <p className="mt-5 silka-regular text-gray-500">
            Companies that make money from advertising are
            double-sided marketplaces. A set of users give away their
            attention for entertainment or learning, and the other set
            buy that attention.
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            You don&apos;t pay anything to use TikTok, Facebook,
            YouTube, or any social platform. You pay with your
            atttention.
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            Companies (advertisers) byy that attention in the form of
            ads.
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            Now that we understand this, what is the{' '}
            <span className="silka-semibold text-gray-900">
              vested interest
            </span>
            ?
          </p>
          <h3 className="text-xl md:text-2xl mt-8 silka-semibold text-[#363636]">
            Vested Interest
          </h3>
          <p className="mt-5 silka-regular text-gray-500">
            Social platforms must have more advertisers, paying more
            money, year after year, to grow. In order to get more
            advertisers, they must have more attention. More people
            must watch videos from longer in order to get the
            attention.
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            Recommendation algorithms, heavily value{' '}
            <span className="silka-semibold text-gray-900">
              Watch Time
            </span>{' '}
            above all. That&apos;s the only way they make money. If
            you can get people to watch more of your videos, for
            longer, the algorithm will reward you.
          </p>
          <h2 className="text-3xl md:text-4xl mt-16 silka-semibold text-gray-900">
            Going Deep On Recommendation Algorithms
          </h2>
          <p className="mt-5 silka-regular text-gray-500">
            My background lies in deep learning, a subset AI & machine
            learning that focuses on large multi-layer neural
            networks. Recommendation algorithms stem for the research
            of this field.
          </p>
          <h3 className="text-xl md:text-2xl mt-8 silka-semibold text-[#363636]">
            Understanding Neural Networks
          </h3>
          <p className="mt-5 silka-regular text-gray-500">
            A neural network is a probabilistic model. It gives you a
            set of probabilities in which the outcome you are
            measuring is likely to occur.{' '}
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            In terms of recommendation algorithms, what is the
            likelihood that the person likes this next video, so that
            they stay on the platform.{' '}
          </p>
          <h3 className="text-xl md:text-2xl mt-8 silka-semibold text-[#363636]">
            How is This Predicted
          </h3>
          <p className="mt-5 silka-regular text-gray-500">
            The recommendation algorithms has many inputs called
            feature ids. A feature id is an input given to the neural
            network to try and predict which video is best to
            recommend.{' '}
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            The following is a paper by Bytedance (founders of TikTok)
            that describes how these feature ids are handled.{' '}
          </p>
          <div className="mt-10 flex flex-col justify-center items-center">
            <img
              src="/images/blog/monolith.png"
              className="max-h-[500px]"
            />
            <a
              href="https://arxiv.org/pdf/2209.07663.pdf"
              target="_blank"
              rel="noopenner noreferrer"
              className="underline mt-4 text-sm silka-medium hover:opacity-90 text-blue-700"
            >
              Link to Paper
            </a>
          </div>
          <p className="mt-7 silka-regular text-gray-500">
            An example of the feature ids are:
          </p>
          <ul className="mt-3 silka-rgular text-gray-500 list-disc">
            <li className="ml-8">Transcript of the video</li>
            <li className="ml-8 mt-1.5">Comments on the video</li>
            <li className="ml-8 mt-1.5">Shares</li>
            <li className="ml-8 mt-1.5">Watch Time</li>
            <li className="ml-8 mt-1.5">Likes</li>
            <li className="ml-8 mt-1.5">Objects in the video</li>
            <li className="ml-8 mt-1.5">Volume of the video</li>
            <li className="ml-8 mt-1.5">
              Text / Title / Description of the video
            </li>
          </ul>
          <p className="mt-5 silka-regular text-gray-500">
            All of these are processed as inputs to the probabilistic
            model, and this models spits out the video that best
            matches your interests.
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            However, not all of these have the same weighting when it
            comes to the recommendation algorithm. As stated before,
            you must align your interestes with the platform.
            Watch-time is king 👑.
          </p>
          <h3 className="text-xl md:text-2xl mt-8 silka-semibold text-[#363636]">
            Feature Ids: Order of Importance
          </h3>
          <ol className="mt-3 silka-regular text-gray-500 list-decimal">
            <li className="ml-8">
              Watch time: The longer viewers watch your video the
              better. If they watch multiple times, you are going to
              go viral.
            </li>
            <li className="ml-8 mt-1.5">
              Shares: If people share your video to other platforms,
              it brings more people to the original platform, thus
              aligning with the original platforms interest.
            </li>
            <li className="ml-8 mt-1.5">
              Comments: This shows that platform that people really
              like your content and are engaging with it. If some
              people like it, others probably will as well.
            </li>
            <li className="ml-8 mt-1.5">
              Likes / Bookmarks: The lowest form of engagement, but at
              least shows some engagement.
            </li>
          </ol>
          <div className="mt-10 flex flex-col justify-center items-center">
            <img
              src="/images/blog/feature-id.png"
              className="max-h-[400px]"
            />
          </div>
          <h3 className="text-xl md:text-2xl mt-14 silka-semibold text-[#363636]">
            Pooled Stages
          </h3>
          <p className="mt-5 silka-regular text-gray-500">
            There are so many videos to pick from for these
            recommendation algorithms. You must have better feature
            ids than all other videos to win.
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            Videos are pooled into stages of virality. These are the
            following stages of views:
          </p>
          <ol className="mt-3 silka-regular text-gray-500 list-decimal">
            <li className="ml-8">0 → 1K views</li>
            <li className="ml-8 mt-1.5">1K → 10K views</li>
            <li className="ml-8 mt-1.5">10K → 100K views</li>
            <li className="ml-8 mt-1.5">100K+ views</li>
          </ol>
          <p className="mt-5 silka-regular text-gray-500">
            You&apos;re video must do better than the people in said
            group in order to go the next one. Remember, these
            platforms what you to go viral, they want people to stay
            on the platform. You have to produce good content.
          </p>
          <h3 className="text-xl md:text-2xl mt-8 silka-semibold text-[#363636]">
            Randomness
          </h3>
          <p className="mt-5 silka-regular text-gray-500">
            Going back to neural networks, at the end of the day they
            are probabilistic models. They make mistakes, they
            aren&apos;t stochastic. Moreover, a certain video might
            get really good feature ids from the beginning and heavily
            outperform.
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            The feature ids at the beginning are totally random, if
            you get good ones, your video may go viral. Bad ones and
            your video doesn&apos;t go anywhere.
          </p>
          <h2 className="text-3xl md:text-4xl mt-16 silka-semibold text-gray-900">
            Getting Started With Content
          </h2>
          <h3 className="text-xl md:text-2xl mt-8 silka-semibold text-[#363636]">
            Step 1
          </h3>
          <p className="mt-5 silka-regular text-gray-500">
            The first thing you have to do is create an account, and
            optimize that account of SEO (Search Engine Optimization).
            You want people that search your account to find you.{' '}
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            Username: Make sure your username is clean, don&apos;t put
            any special characters or weird numbers.
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            Name: Make sure the name is the product you are selling,
            or the brand you are building. (This could be your own
            personal brand).
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            Profile Picture: The profile picture has to be high
            quality, and describes you exactly. Look at other big
            people in the space. Their profile picture is clean, and
            usually very simple. Have good background lighting, good
            contrast, and make sure it&apos;s high quality, pixel
            wise.
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            Description: A description that describes exactly what you
            are doing. You should be able to explain this to a 10 year
            old and they would understand. Moreover, focus on a single
            niche. Don&apos;t attack huge areas from the beginning,
            eat an elephant one bite at a time.{' '}
          </p>
          <h3 className="text-xl md:text-2xl mt-8 silka-semibold text-[#363636]">
            Setup
          </h3>
          <p className="mt-5 silka-regular text-gray-500">
            You&apos;re setup isn&apos;t going to change your
            virality. A 5k camera isn&apos;t what&apos;s going to make
            you go viral. The feature ids on your videos is
            what&apos;s going to make you go viral.{' '}
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            Use your phone camera, or your laptop camera. That&apos;s
            all you need.{' '}
          </p>
          <h3 className="text-xl md:text-2xl mt-8 silka-semibold text-[#363636]">
            Video Ideas
          </h3>
          <p className="mt-5 silka-regular text-gray-500">
            In order to get video ideas you must have a plan. What are
            you planning to create your content about? Is your content
            to promote your product? Is your content to build an
            audience? Is your content to teach someone something
            specific? What is it?
          </p>
          <h4 className="text-lg md:text-xl mt-7 silka-semibold text-[#363636]">
            Sell a Product
          </h4>
          <ul className="mt-3 silka-regular text-gray-500 list-disc">
            <li className="ml-8">
              Find viral videos of competitors or those in the same
              niche
            </li>
            <li className="ml-8 mt-1.5">
              Think of ways to recreate videos with your own twist
              (controversy)
            </li>
            <li className="ml-8 mt-1.5">
              Look at formats of videos that perform best, and do more
              of those.
            </li>
          </ul>
          <h4 className="text-lg md:text-xl mt-7 silka-semibold text-[#363636]">
            Build an Audience
          </h4>
          <ul className="mt-3 silka-regular text-gray-500 list-disc">
            <li className="ml-8">
              Must be in a specific niche, and then expand from there.
            </li>
            <li className="ml-8 mt-1.5">
              Be unique so people care, if you are doing what everyone
              else is doing, no one is going to care.{' '}
            </li>
            <li className="ml-8 mt-1.5">
              Engage with your audience on many platforms, and solve a
              problem for them.
            </li>
            <li className="ml-8 mt-1.5">
              What do you want from your audience?
            </li>
          </ul>
          <h4 className="text-lg md:text-xl mt-7 silka-semibold text-[#363636]">
            Teach Something
          </h4>
          <ul className="mt-3 silka-regular text-gray-500 list-disc">
            <li className="ml-8">Solve the problem for them.</li>
            <li className="ml-8 mt-1.5">
              Create supplementary material to go with your videos.{' '}
            </li>
            <li className="ml-8 mt-1.5">
              How is it that as soon as someone watches your video,
              they get the value implemented from them. Ex. Sales →
              write the exact sales script and give it to them.
            </li>
          </ul>
          <h3 className="text-xl md:text-2xl mt-8 silka-semibold text-[#363636]">
            Post SEO
          </h3>
          <p className="mt-5 silka-regular text-gray-500">
            You want to incorporate keywords into your captions and
            videos that are relevant to what you want poeple to search
            for
          </p>
          <ul className="mt-3 silka-regular text-gray-500 list-disc">
            <li className="ml-8">
              You want those captions to be both on the screen as the
              video is playing and the captions.
            </li>
          </ul>
          <p className="mt-5 silka-regular text-gray-500">
            Include 2-3 SEO categorization hashtags in your videos.
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            Add voice overs / text to speech with a couple of
            keywords. This indicates to the feature id puller
            that&apos;s those keywords are important.
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            Use trending sounds and viral templates in your niche in
            order to appeal to your audience better.
          </p>
          <h2 className="text-3xl md:text-4xl mt-16 silka-semibold text-gray-900">
            Creating Content
          </h2>
          <p className="mt-5 silka-regular text-gray-500">
            The number one rule is to give people a reason to watch
            the entire video. Put at hook at the beginning.
          </p>
          <h3 className="text-xl md:text-2xl mt-8 silka-semibold text-[#363636]">
            Example Hooks
          </h3>
          <ul className="mt-3 silka-regular text-gray-500 list-disc">
            <li className="ml-8">
              If you like ___ you&apos;re gonna like/hate this.
            </li>
            <li className="ml-8 mt-1.5">
              I spent ___ years designing this.
            </li>
            <li className="ml-8 mt-1.5">
              For my male/female audience
            </li>
            <li className="ml-8 mt-1.5">
              My secret strategy to ____
            </li>
            <li className="ml-8 mt-1.5">
              You won&apos;t believe this __ hack!
            </li>
            <li className="ml-8 mt-1.5">Are you guilty of ___ ?</li>
            <li className="ml-8 mt-1.5">
              4 Mistakes you&apos;re making on/with{' '}
            </li>
            <li className="ml-8 mt-1.5">Have you heard about ___?</li>
            <li className="ml-8 mt-1.5">Proven ways to ___ </li>
          </ul>
          <h3 className="text-xl md:text-2xl mt-8 silka-semibold text-[#363636]">
            Structure of the Video
          </h3>
          <p className="mt-5 silka-regular text-gray-500">
            Each video must start with a hook. You want to grab
            people&apos;s attention in the first 1-2 seconds.
            Something clickbaity, but not make it clickbait. It&apos;s
            only clickbait if you don&apos;t give what you promised.{' '}
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            The video must contain some controversy. This is what
            makes people watch the whole video, and share the video.
            Thus heavily boosting your feature ids.{' '}
            <span>
              You want people to go straight to the comments because
              of your controversial video.
            </span>
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            <span>Remember:</span> Focus on getting people to watch to
            the end. Mention something near beginning of the video but
            don&apos;t show it until the end. Write a storyline that
            people will follow.
          </p>
          <div className="mt-10 flex flex-col justify-center items-center">
            <img
              src="/images/blog/video-structure.png"
              className="max-h-[400px]"
            />
          </div>
          <h3 className="text-xl md:text-2xl mt-16 silka-semibold text-[#363636]">
            Promotion
          </h3>
          <p className="mt-5 silka-regular text-gray-500">
            If you are promoting something, value should be 3:1. For
            every three pieces of content you give value, you promote
            your product once.{' '}
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            The more value you give other users, for free, the more
            they will have the desire to give you something in return.
            Make your free stuff better than others paid stuff.{' '}
          </p>
          <h3 className="text-xl md:text-2xl mt-8 silka-semibold text-[#363636]">
            Type of Content
          </h3>
          <p className="mt-5 silka-regular text-gray-500">
            Look at the structure of your content. Remember, most
            things in life are numbers games. Your content must scale
            so that you are post multiple times per day, every day.{' '}
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            For example, if you have a podcast, all of a sudden, one
            long form piece of content can buy turned into many
            shorter ones.
          </p>
          <h2 className="text-3xl md:text-4xl mt-16 silka-semibold text-gray-900">
            Automation & Scaling
          </h2>
          <p className="silka-regular text-gray-500 mt-5">
            You now want to build a machine. Build a machine that
            spits out content for you! Each piece of content should be
            on multiple platforms, all at once.{' '}
          </p>
          <h3 className="text-xl md:text-2xl mt-8 silka-semibold text-[#363636]">
            Posting Schedule
          </h3>
          <p className="mt-5 silka-regular text-gray-500">
            You should post 3-4 times a day on a single account. You
            want to be very consistent, and religous about doing this
            every day.{' '}
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            Test out different forms of content and trends that get
            you the best results. Once a trend or format works,
            recreate that same hit with different variations and keep
            posting.
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            Keep testing until you find the right trend and ride the
            entire trend out.
          </p>
          <h3 className="text-xl md:text-2xl mt-8 silka-semibold text-[#363636]">
            AI Tools
          </h3>
          <p className="mt-5 silka-regular text-gray-500">
            You want to use tools that create this content for you.
            Input a large podcast, and the content is divided into
            multiple clips for you.{' '}
            <span className="silka-semibold text-gray-900">
              Disperse
            </span>{' '}
            does exactly this.{' '}
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            Make sure most of the editing of the videos is done using
            AI.
          </p>
          <h3 className="text-xl md:text-2xl mt-8 silka-semibold text-[#363636]">
            Our Software
          </h3>
          <ul className="mt-3 silka-regular text-gray-500 list-disc">
            <li className="ml-8">
              Disperse is a full-stack tool for your content creation
              and social media management. It allows you to create
              content using AI-Native tools and post / schedule that
              content to multiple social platforms, all within the
              same platform.
            </li>
            <li className="ml-8 mt-1.5">
              It allows you to input a long video, and it will
              automatically cut it that video into clips and give you
              a full editor experience.
            </li>
            <li className="ml-8 mt-1.5">
              Moreover, it gives you all of the tools to post on
              multiple social platforms at once.
            </li>
            <li className="ml-8 mt-1.5">
              Create a month of content on all social platforms at the
              beginning of each month.
            </li>
          </ul>
          <div className="flex flex-col justify-center items-center mt-12">
            <video
              controls
              src="https://trydisperse.b-cdn.net/homepage/demo.mp4"
              className="bg-black"
            />
            <p className="mt-6 text-sm silka-semibold text-[#363636]">
              Demo of Disperse
            </p>
          </div>
          <h3 className="text-xl md:text-2xl mt-16 silka-semibold text-[#363636]">
            All Platforms
          </h3>
          <p className="mt-5 silka-regular text-gray-500">
            You must post your content on all platforms, in order to
            gain the largest likelihood of getting your videos
            recommended on those platforms. The more videos, on more
            platforms, the higher the likelihood you go viral.{' '}
          </p>
          <h3 className="text-xl md:text-2xl mt-8 silka-semibold text-[#363636]">
            Time
          </h3>
          <p className="mt-5 silka-regular text-gray-500">
            You should be spending most of your time optimizing your
            content for feature ids, not posting on multiple
            platforms. Using our platform, Disperse, you can schedule
            a month full of content for less than $1 a day.
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            This way you can post 100s of pieces of content a month
            with an hour of work.
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            Use tools that provide you with the highest leverage on
            your time.
          </p>
          <h2 className="text-3xl md:text-4xl mt-16 silka-semibold text-gray-900">
            Iteration
          </h2>
          <p className="mt-5 silka-regular text-gray-500">
            You want to keep improving, and making your content better
            everyday. You should always be asking yourself what you
            can be doing to get the most feature ids on your videos so
            that your videos go viral.
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            Check your analytics on each of your social on Disperse,
            at least once a week, and iterate on how you can make your
            content better.
          </p>
          <p className="mt-5 silka-regular text-gray-500">
            Keep up this flywheel and in no time you will be one of
            the best in your niche.
          </p>
          <div className="mt-14 flex flex-col justify-center items-center">
            <img
              src="/images/blog/iterate.png"
              className="max-h-[400px]"
            />
          </div>
        </section>
      </div>
    </Container>
  );
}
