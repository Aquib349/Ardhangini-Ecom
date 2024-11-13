import { Switch } from "../../components/ui/switch";

interface paymentProps {
  isCodEnabled: boolean;
  handleToggle: () => void;
}

function Payment({ isCodEnabled, handleToggle }: paymentProps) {
  return (
    <>
      <div className="border px-4 py-3 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Payment Summary</h2>
        <div className="cod flex items-center justify-between">
          <p className="">Cash On Delivery</p>
          <Switch
            id="airplane-mode"
            checked={isCodEnabled}
            onCheckedChange={handleToggle}
          />
        </div>
      </div>
    </>
  );
}

export default Payment;
