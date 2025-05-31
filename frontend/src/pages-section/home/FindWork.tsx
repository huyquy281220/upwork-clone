import Image from "next/image";

export default function FindWorkSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Person working at desk"
              width={500}
              height={400}
              className="rounded-md"
            />
          </div>

          <div className="md:w-1/2 bg-blue-600 text-white p-8 rounded-md">
            <h2 className="text-3xl font-bold mb-4">
              Find great
              <br />
              work
            </h2>

            <p className="mb-6">
              Meet clients you&#39;re excited to work with and take your career
              or business to new heights.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
                  1
                </div>
                <p>
                  Find opportunities for every stage of your freelance career
                </p>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
                  2
                </div>
                <p>Control when, where, and how you work</p>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
                  3
                </div>
                <p>Explore different ways to earn</p>
              </div>
            </div>

            <button className="bg-white text-blue-600 hover:bg-gray-100">
              Find Work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
