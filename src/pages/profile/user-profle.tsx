// import { Trash2, Upload } from "lucide-react";
// import EditForm from "./edit-form";
import { useGlobal } from "../../hooks/use-global";
import { useUser } from "../../hooks/use-user";
import UserAddress from "./user-address";
import logo from "../../assets/user.png";

const Profile = () => {
  const { addresses, addUserAddress, removeUserAddress } = useGlobal();
  const { userDetail } = useUser();

  return (
    <div className="py-4">
      <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md text-sm">
        {/* Profile Picture and Upload Button */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Profile" className="w-20 h-20 rounded-full" />
          </div>
        </div>

        {/* Name Section */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-semibold">
              {userDetail?.firstName} {userDetail?.lastName}
            </p>
          </div>

          {/* edit form */}
          {/* <EditForm updateUserDetails={updateUserDetails} /> */}
        </div>

        {/* Contacts Section */}
        <div className="py-4 border-b">
          <div>
            <p className="text-gray-700 font-medium pb-1">Contacts</p>
            <p>
              <strong>Phone:</strong> {userDetail?.mobile}
            </p>
            <p>
              <strong>Email:</strong> {userDetail?.email}
            </p>
          </div>
        </div>

        {/* address */}
        <UserAddress
          addresses={addresses}
          removeUserAddress={removeUserAddress}
          addUserAddress={addUserAddress}
        />
      </div>
    </div>
  );
};

export default Profile;
