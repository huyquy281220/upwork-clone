"use client";

import { Tabs } from "@/components/common/Tabs";
import { useState } from "react";
import {
  LogoMicrosoft,
  LogoAirbnb,
  LogoBissel,
  LogoGlassdoor,
} from "@/assets/svg";
import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<string>("for-clients");

  console.log(activeTab);

  return (
    <section className="mt-12 px-3 md:px-0">
      <div className="container mx-auto p-16 rounded-3xl bg-[url(/WorkGame.jpg)] bg-cover bg-center md:h-[628px]">
        <div className="md:max-w-[700px]">
          <h2 className="text-white text-2xl md:text-[4.25rem] font-bold leading-none">
            Connecting clients in need to freelancers who deliver
          </h2>

          <div className="mt-10 p-8 bg-[rgba(0,0,0,0.3)] backdrop-blur-[80px] rounded-3xl hidden md:block">
            <Tabs
              onActive={(value) => setActiveTab(value)}
              tabs={[
                {
                  title: "For clients",
                  value: "for-clients",
                },
                {
                  title: "For freelancers",
                  value: "for-freelancers",
                },
              ]}
              tabClassName="w-full"
              containerClassName="border rounded-3xl"
            />

            <div className="h-32">
              {activeTab === "for-clients" && <ClientContent />}
              {activeTab === "for-freelancers" && <FreelancerContent />}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 p-8 bg-main backdrop-blur-[80px] rounded-3xl md:hidden overflow-hidden">
        <Tabs
          onActive={(value) => setActiveTab(value)}
          tabs={[
            {
              title: "For clients",
              value: "for-clients",
            },
            {
              title: "For freelancers",
              value: "for-freelancers",
            },
          ]}
          tabClassName="w-full"
          containerClassName="border rounded-3xl"
        />

        <div className="h-36">
          {activeTab === "for-clients" && <ClientContent />}
          {activeTab === "for-freelancers" && <FreelancerContent />}
        </div>
      </div>
    </section>
  );
}

const ClientContent = () => {
  return (
    <div className="py-4">
      <div className="flex items-center bg-gray-800 rounded-full p-1">
        <input
          type="text"
          placeholder="Search by role, skills, or keywords"
          className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-4 py-2 text-sm"
        />
        <Button className="bg-main text-black rounded-full p-2 transition-colors">
          <Search className="text-white" />
        </Button>
      </div>
      <div className="flex justify-between gap-3 mt-8">
        {[LogoMicrosoft, LogoAirbnb, LogoBissel, LogoGlassdoor].map(
          (Logo, index) => (
            <Image src={Logo} alt="Logo" key={index} className=" h-6" />
          )
        )}
      </div>
    </div>
  );
};

const FreelancerContent = () => {
  return (
    <div className="flex flex-col gap-4 items-center py-4">
      <p className="md:max-w-[500px] text-white text-center text-xl">
        Build your freelancing career on Prowork, with thousands of jobs posted
        every week.
      </p>
      <button className="px-4 py-2 bg-primary rounded-md text-white">
        Explore recently posted jobs
      </button>
    </div>
  );
};
