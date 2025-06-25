"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Clock, Github, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobSkeletion from "@/components/common/JobSkeleton";
import { useUser } from "@/hooks/useUserInfo";
import { useSession } from "next-auth/react";
import CirclePencil from "@/components/common/CirclePencil";
import { AddLanguageModal } from "@/components/modals/freelancer/AddLanguageModal";
import { AddEducationModal } from "@/components/modals/freelancer/AddEducationModal";
import { FreelancerUser } from "@/types/user";
import { EditLanguagesModal } from "@/components/modals/freelancer/EditLanguageModal";
import { useModalManager } from "@/hooks/useModalManager";
import { EditEducationModal } from "@/components/modals/freelancer/EditEducationModal";
import { AvailabilityModal } from "@/components/modals/freelancer/AvailabilityModal";
import CircleTrash from "@/components/common/CircleTrash";
import useLocalTime from "@/hooks/useLocalTime";
import ImageUploadModal from "@/components/modals/freelancer/ImageUploadModal";

const availabilityOptions = {
  MORE_THAN_30: "More than 30 hrs/week",
  LESS_THAN_30: "Less than 30 hrs/week",
  AS_NEEDED: "As needed - open to offers",
  NONE: "None",
};

export function ProfileSidebar() {
  const { openModal, closeModal, isModalOpen, getModalId } = useModalManager();
  const { data: session, status } = useSession();
  const { data: user, isLoading } = useUser<FreelancerUser>(
    session?.user.id ?? ""
  );

  const { time, location } = useLocalTime();

  if (isLoading || status === "loading") return <JobSkeletion />;

  const currentLanguages = user?.freelancerProfile?.languages;
  const educations = user?.freelancerProfile?.education;
  const avatar = user?.avatarUrl;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-card">
        <CardHeader className="text-center">
          <Avatar className="relative w-[5.5rem] h-[5.5rem] mx-auto mb-4 z-10 overflow-visible">
            <AvatarImage
              src={avatar ?? "/placeholder.svg?height=80&width=80"}
              alt="Hai H."
              className="rounded-full object-cover object-center"
            />

            <div className="absolute right-0 bottom-0 z-50">
              <CirclePencil
                onEdit={() => openModal("image-upload")}
                classes="bg-background"
              />
            </div>
            <AvatarFallback>HH</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">{user?.fullName}</h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </div>
          </div>
          <div className="flex justify-center gap-2 pt-6">
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 border-green-600"
            >
              See public view
            </Button>
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-foreground"
            >
              Profile settings
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Connects */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Connects: 0</h3>
          </div>
          <div className="flex gap-2">
            <Button variant="link" className="text-green-600 p-0">
              View details
            </Button>
            <Button variant="link" className="text-green-600 p-0">
              Buy Connects
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Verification Items */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">Hours per week</p>
              <CirclePencil onEdit={() => openModal("availability")} />
            </div>
            <p className="text-sm text-muted-foreground">
              {user?.freelancerProfile?.available
                ? availabilityOptions[user.freelancerProfile.available]
                : "Not specified"}
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">Languages</p>
              <div className="flex items-center gap-2">
                <CirclePencil onEdit={() => openModal("editLanguage")} />
                <CirclePlus
                  className="w-8 h-8 text-green-600 stroke-1 cursor-pointer"
                  onClick={() => openModal("addLanguage")}
                />
              </div>
            </div>

            {currentLanguages &&
              currentLanguages.map(({ name, proficiency }) => (
                <p className="text-sm text-muted-foreground" key={name}>
                  <span className="font-medium text-foreground">{name}: </span>
                  {proficiency}
                </p>
              ))}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">Education</p>
              <div className="flex items-center gap-2">
                <CirclePlus
                  className="w-8 h-8 text-green-600 stroke-1 cursor-pointer"
                  onClick={() => openModal("addEducation")}
                />
              </div>
            </div>

            {educations?.map(
              ({ id, school, startYear, endYear, degree, areaOfStudy }) => (
                <div key={school} className="mb-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-foreground">{school}</p>
                    <div className="flex gap-1">
                      <CirclePencil
                        onEdit={() => openModal("editEducation", id)}
                      />
                      <CircleTrash />
                    </div>
                  </div>
                  <p className="text-sm text-[#a5a5a5]">
                    {degree}, {areaOfStudy}
                  </p>
                  <p className="text-sm text-[#a5a5a5]">
                    {startYear} - {endYear}
                  </p>
                </div>
              )
            )}
          </div>

          <div>
            <p>Linked account</p>
            <Button
              variant="link"
              className="flex justify-center w-full mt-2 text-green-600 p-0 border border-green-600 rounded-full"
            >
              <Github className="w-4 h-4" />
              <span>Github</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <AddLanguageModal
        open={isModalOpen("addLanguage")}
        onOpenChange={() => closeModal()}
      />

      <EditLanguagesModal
        open={isModalOpen("editLanguage")}
        onOpenChange={() => closeModal()}
      />

      <AddEducationModal
        open={isModalOpen("addEducation")}
        onOpenChange={() => closeModal()}
        onSave={() => {}}
      />

      <EditEducationModal
        open={isModalOpen("editEducation")}
        onOpenChange={() => closeModal()}
        educationId={getModalId() ?? ""}
      />

      <AvailabilityModal
        open={isModalOpen("availability")}
        onOpenChange={() => closeModal()}
        // currentContractToHire={user?.freelancerProfile?.contractToHire ?? null}
      />

      <ImageUploadModal
        open={isModalOpen("image-upload")}
        onOpenChange={() => closeModal()}
      />
    </div>
  );
}
