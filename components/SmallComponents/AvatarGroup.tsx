import Image from "next/image";
function AvatarGroup() {
  return (
    <div className="avatar-group -space-x-6">
      <div className="avatar">
        <div className="w-12">
          <Image
            width={30}
            height={30}
            alt="Avatar"
            src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
          />
        </div>
      </div>
      <div className="avatar">
        <div className="w-12">
          <Image
            width={30}
            height={30}
            alt="avatar2"
            src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
          />
        </div>
      </div>
      <div className="avatar">
        <div className="w-12">
          <Image
            width={30}
            height={30}
            alt="avatar3"
            src="https://img.daisyui.com/images/profile/demo/averagebulk@192.webp"
          />
        </div>
      </div>
      <div className="avatar avatar-placeholder">
        <div className="bg-neutral text-neutral-content w-12">
          <span>+99</span>
        </div>
      </div>
    </div>
  );
}
export { AvatarGroup };
