"use client";

import { Loader2, Save, Shield, Trash2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage(): React.JSX.Element {
  const { data: session, update: updateSession } = useSession();
  const router = useRouter();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-white/90 tracking-tight">
          Settings
        </h1>
        <p className="text-white/35 mt-1">
          Manage your account and preferences
        </p>
      </div>

      <ProfileSection
        session={session}
        updateSession={updateSession}
        router={router}
      />
      <PasswordSection />
      <DangerZoneSection />
    </div>
  );
}

function ProfileSection({
  session,
  updateSession,
  router,
}: {
  session: ReturnType<typeof useSession>["data"];
  updateSession: ReturnType<typeof useSession>["update"];
  router: ReturnType<typeof useRouter>;
}) {
  const [name, setName] = useState(session?.user?.name || "");
  const [savingProfile, setSavingProfile] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setSavingProfile(true);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.error || "Failed to update profile");
        return;
      }

      toast.success("Profile updated!");
      await updateSession({ name });
      router.refresh();
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <User className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <CardTitle className="text-lg">Profile</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              minLength={2}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={session?.user?.email || ""}
              disabled
              className="opacity-50"
            />
            <p className="text-xs text-white/30">Email cannot be changed</p>
          </div>
          <Button type="submit" disabled={savingProfile} className="gap-2">
            {savingProfile ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function PasswordSection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const handleChangePassword = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setSavingPassword(true);

    try {
      const res = await fetch("/api/user/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.error || "Failed to change password");
        return;
      }

      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch {
      toast.error("Failed to change password");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Shield className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <CardTitle className="text-lg">Security</CardTitle>
            <CardDescription>Change your password</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              minLength={6}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={savingPassword}
            variant="outline"
            className="gap-2"
          >
            {savingPassword ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Shield className="h-4 w-4" />
            )}
            Change Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function DangerZoneSection() {
  const [deletingAccount, setDeletingAccount] = useState(false);

  const handleDeleteAccount = async (): Promise<void> => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action is irreversible and will delete all your roadmaps.",
      )
    ) {
      return;
    }

    setDeletingAccount(true);

    try {
      const res = await fetch("/api/user/profile", { method: "DELETE" });
      const data = await res.json();

      if (!data.success) {
        toast.error(data.error || "Failed to delete account");
        return;
      }

      toast.success("Account deleted. Goodbye!");
      await signOut({ callbackUrl: "/" });
    } catch {
      toast.error("Failed to delete account");
    } finally {
      setDeletingAccount(false);
    }
  };

  return (
    <Card className="border-red-500/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <Trash2 className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <CardTitle className="text-lg text-red-400">Danger Zone</CardTitle>
            <CardDescription>Irreversible destructive actions</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-white/40 mb-4">
          Deleting your account will permanently remove all your data, including
          roadmaps and progress. This action cannot be undone.
        </p>
        <Button
          variant="destructive"
          onClick={handleDeleteAccount}
          disabled={deletingAccount}
          className="gap-2"
        >
          {deletingAccount ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
          Delete Account
        </Button>
      </CardContent>
    </Card>
  );
}
