export default function RatingGuide() {
  const guide = [
    {
      range: "4.5 - 5.0",
      label: "Very Good",
      description:
        "The item is in optimal working condition with no apparent signs of damage or degradation, in line with the vehicle's age.",
      color: "bg-green-100 border-green-300",
    },
    {
      range: "3.5 - 4.0",
      label: "Good",
      description:
        "The item is functional with some signs of damage or wear and tear, appropriate for the vehicle's age.",
      color: "bg-lime-100 border-lime-300",
    },
    {
      range: "2.5 - 3.0",
      label: "Fair",
      description:
        "The item is operational but shows noticeable damage or wear and tear, consistent with the age of the vehicle.",
      color: "bg-yellow-100 border-yellow-300",
    },
    {
      range: "1.5 - 2.0",
      label: "Poor",
      description:
        "The item is not functioning properly or displays significant damage or wear and tear.",
      color: "bg-orange-100 border-orange-300",
    },
    {
      range: "0.5 - 1.0",
      label: "Very Poor",
      description:
        "The item is non-functional or shows severe signs of damage or excessive wear and tear.",
      color: "bg-red-100 border-red-300",
    },
  ];

  return (
    <div className="rounded-xl border" id="rating-guide">
      <div className="bg-muted rounded-t-xl px-4 sm:px-6 py-4 border-b">
        <h4 className="font-semibold text-lg">Rating Guide</h4>
      </div>
      <div className="p-4 sm:p-6 space-y-4">
        {guide.map((item, index) => (
          <div
            key={index}
            // className={`border-l-4 px-4 py-3 rounded-md ${item.color} space-y-1`}
          >
            <p className="text-sm">
              {item.range} <span className="font-medium">{item.label}</span>
            </p>
            <p className="text-sm text-text">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
