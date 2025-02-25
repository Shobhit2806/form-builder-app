const LandingPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[92vh]">
        <img src="/images/empty-form.svg" alt="empty-form-img" width="400px" />
        <button className="mt-2 border-2 border-blue-800 px-16 py-2 cursor-pointer hover:text-blue-800">
          ＋ Create Form
        </button>
      </div>
    </>
  );
};

export default LandingPage;
