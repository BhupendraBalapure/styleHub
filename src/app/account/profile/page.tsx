import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/account/profile-form";

export default async function ProfilePage() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
  });

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-xl">Profile</h2>
      <ProfileForm
        name={user?.name ?? ""}
        email={user?.email ?? ""}
        role={user?.role ?? "USER"}
      />
    </div>
  );
}
