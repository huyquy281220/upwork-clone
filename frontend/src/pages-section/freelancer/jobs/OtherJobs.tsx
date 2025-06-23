export function OtherJobs() {
  const jobs = [
    "Easy Job Evaluation Needed for Big Button Mobile Phone/Cell for Elderly People",
    "Easy Job Evaluation Needed for Big Button Mobile Phone/Cell for Elderly People",
    "Product Research for Big Button Mobile Phone - No Experience Needed",
    "Product Test and Evaluation for Kids Camera",
    "Need Interview and Evaluation for Kids Camera",
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">
        Other open jobs by this Client (5)
      </h3>
      <div className="space-y-2">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="text-green-500 hover:underline cursor-pointer"
          >
            {job} <span className="text-muted-foreground">Fixed-price</span>
          </div>
        ))}
      </div>
      <button className="text-green-500 text-sm">View more (4)</button>
    </div>
  );
}
