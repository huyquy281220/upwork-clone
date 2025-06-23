export function ActivitySection() {
  const activities = [
    { label: "Proposals", value: "Less than 5" },
    { label: "Interviewing", value: "0" },
    { label: "Invites sent", value: "0" },
    { label: "Unanswered invites", value: "0" },
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
