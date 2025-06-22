"use client";

interface Props {
  value: number;
}

const Circle: React.FC<Props> = ({ value }) => {
  return (
    <div className="w-18 h-18 rounded-full bg-yellow-50 border border-gray-500 flex items-center justify-center text-4xl">
      {value}
    </div>
  );
};

export default Circle;
