import Image from "next/image";
import { FindGreatWorkImg } from "@/assets/images";
export default function FindWorkSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <Image
              src={FindGreatWorkImg}
              alt="Person working at desk"
              width={500}
              height={400}
              className="rounded-s-md w-full"
            />
          </div>

          <div className="md:w-1/2 flex flex-col justify-center bg-blue-600 text-white p-8 rounded-e-md">
            <p className="text-3xl text-white font-semibold">For clients</p>
            <h2 className="py-6 inline-block text-[4rem] leading-none font-bold mb-4">
              Find great
              <br />
              work
            </h2>

            <p className="mb-6 text-lg">
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

            <button className="w-1/2 py-2 rounded-md bg-white text-blue-600 hover:bg-gray-100">
              Find Opportunities
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
