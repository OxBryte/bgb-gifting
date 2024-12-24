import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGiftItems } from "~/contexts/GiftItemsContext";
import useDebounce from "~/hooks/useDebounce";

export function Password() {
  const { updatePassword } = useGiftItems();
  const [password, setPassword] = useState<string>("");
  const debouncedPassword = useDebounce(password, 500);
  const [hasSeenToast, setHasSeenToast] = useState(false);

  useEffect(() => {
    // const encryptedPassword = CryptoJS.AES.encrypt(debouncedPassword, 'secret key 123').toString();
    updatePassword(debouncedPassword);
  }, [debouncedPassword, updatePassword]);

  return (
    <div className="w-full space-y-4">
      <h2 className="text-lg">Add a nice message </h2>
      <textarea
        placeholder="Write heartfelt message here"
        rows={6}
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => {
          if (!hasSeenToast) {
            toast.info(
              "Be careful with this message! Anyone can use this message to claim your gift.",
            );
            setHasSeenToast(true);
          }
        }}
        className="mx-auto w-full rounded-md border border-gray-300 p-4"
      />
    </div>
  );
}
