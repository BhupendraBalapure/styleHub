import { Star, Trash2 } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { AddressForm } from "@/components/account/address-form";
import { deleteAddress, setDefaultAddress } from "@/lib/actions/account";

export default async function AddressesPage() {
  const session = await auth();
  const addresses = await prisma.address.findMany({
    where: { userId: session!.user.id },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 font-serif text-xl">Saved addresses</h2>
        {addresses.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
            No saved addresses yet.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {addresses.map((a) => (
              <li key={a.id} className="relative rounded-xl border border-border p-5">
                {a.isDefault ? (
                  <Badge className="absolute right-3 top-3 bg-gold text-ink hover:bg-gold">
                    Default
                  </Badge>
                ) : null}
                <p className="font-medium">{a.fullName}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {a.line1}
                  <br />
                  {a.city}, {a.state} {a.zip}
                  <br />
                  {a.country}
                  {a.phone ? (
                    <>
                      <br />
                      {a.phone}
                    </>
                  ) : null}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  {!a.isDefault ? (
                    <form action={setDefaultAddress}>
                      <input type="hidden" name="id" value={a.id} />
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                        <Star className="h-3.5 w-3.5" /> Set default
                      </button>
                    </form>
                  ) : null}
                  <form action={deleteAddress}>
                    <input type="hidden" name="id" value={a.id} />
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AddressForm />
    </div>
  );
}
