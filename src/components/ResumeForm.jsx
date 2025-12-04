import useCVStore from "../store/useCVStore";
import PersonalInfoForm from "./PersonalInfoForm";
import SummarySection from "./SummarySection";

export default function ResumeForm() {
  const cv = useCVStore((state) => state.cv);

  return (
    <div className="p-4 border rounded bg-white shadow">
      <h2 className="font-bold text-xl mb-4">Informations du CV</h2>

      <PersonalInfoForm data={cv.personal} />
      <SummarySection value={cv.summary} />
    </div>
  );
}
