import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

interface FabricDetails {
  fabricName: string;
  fabricDescription: string;
  washCare: string;
}

interface SareeDetailProps {
  length: string;
  width: string;
  blousepieceincluded: boolean;
  blouse_desc: string;
  fabricDetails: FabricDetails;
  color: string;
}

function SareeDetail({
  length,
  width,
  blousepieceincluded,
  blouse_desc,
  fabricDetails,
  color,
}: SareeDetailProps) {
  const details = [
    { label: "Length", value: length },
    { label: "Width", value: width },
    {
      label: "Blouse Piece Included",
      value: blousepieceincluded ? "Yes" : "No",
    },
    { label: "Blouse Description", value: blouse_desc },
    { label: "Color", value: color },
  ];

  return (
    <div className="saree-detail">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:no-underline text-lg font-light">
            Details
          </AccordionTrigger>
          <AccordionContent>
            {/* Main Details */}
            <div className="space-y-2">
              {details.map((detail, index) => (
                <div key={index} className="flex space-x-2">
                  <p className="font-medium">{detail.label}:</p>
                  <p className="text-slate-700">{detail.value}</p>
                </div>
              ))}
            </div>

            {/* Fabric Details */}
            <div className="mt-2">
              <p className="font-medium">Fabric Details:</p>
              <div className="space-y-2 pl-4 mt-2">
                <div className="flex space-x-2">
                  <p className="font-medium">Fabric Name:</p>
                  <p className="text-slate-700">{fabricDetails.fabricName}</p>
                </div>
                <div className="flex space-x-2">
                  <p className="font-medium">Fabric Description:</p>
                  <p className="text-slate-700">
                    {fabricDetails.fabricDescription}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <p className="font-medium">Wash Care:</p>
                  <p className="text-slate-700">{fabricDetails.washCare}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default SareeDetail;
