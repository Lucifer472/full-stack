interface PageTitleProps {
  title: string;
  blocks?: React.ReactNode;
}

const PageTitle = ({ title, blocks }: PageTitleProps) => {
  return (
    <div className="w-full bg-white flex items-center justify-start px-4 py-6 rounded-md shadow border border-slate-100">
      <h2 className="text-lg text-gray-800 font-semibold whitespace-nowrap">
        {title}
      </h2>
      {blocks}
    </div>
  );
};

export default PageTitle;
