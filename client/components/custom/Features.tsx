import React from "react";

const featuresContent = [
  {
    id: 1,
    icon: "Icon 1",
    title: "Pipeline View",
    description:
      "See exactly where each application stands. No more 'wait, did I apply there?",
  },
  {
    id: 2,
    icon: "Icon 2",
    title: "Never Miss a Deadline",
    description: "Track deadlines, interviews, and follow-ups automatically.",
  },
  {
    id: 3,
    icon: "Icon 3",
    title: "Interview Ready",
    description:
      "Store company research, questions, and prep notes all in one place.",
  },
];

const Features = () => {
  return (
    <div className="w-full h-screen max-h-full flex flex-col justify-center items-center gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-24">
        {featuresContent.map((feature) => (
          <div
            key={feature.id}
            className="w-full max-w-sm border border-gray-200 rounded-lg px-8 py-4 space-y-4 bg-slate-50"
          >
            <p className="text-xs">{feature.icon}</p>
            <p className="text-xl font-semibold">{feature.title}</p>
            <p className="text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
