type ActivitySectionProps = {
  proposals: number;
  interviewing: number;
  invitesSent: number;
  unansweredInvites: number;
};

export function ActivitySection({
  proposals,
  interviewing,
  invitesSent,
  unansweredInvites,
}: ActivitySectionProps) {
  const activities = [
    {
      label: "Proposals",
      value: `${proposals < 5 ? "Less than 5" : proposals}`,
    },
    { label: "Interviewing", value: `${interviewing || 0}` },
    { label: "Invites sent", value: `${invitesSent || 0}` },
    { label: "Unanswered invites", value: `${unansweredInvites || 0}` },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Activity on this job
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {activities.map((activity, index) => (
          <div key={index} className="text-center">
            <div className="font-semibold text-foreground">
              {activity.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {activity.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
