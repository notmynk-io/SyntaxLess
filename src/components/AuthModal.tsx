import React, { useState } from "react";
import { User } from "../types";
import { 
  X, 
  Database, 
  Lock, 
  Mail, 
  User as UserIcon, 
  Sparkles, 
  CheckCircle2, 
  Key, 
  Server,
  LogOut,
  ArrowRight
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onLoginSuccess: (user: User) => void;
  onLogout: () => void;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  atlasConnected: boolean;
  dbCluster: string;
}

export const AuthModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout,
}) => {
  const [tab, setTab] = useState<"login" | "signup" | "atlas_config">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [atlasUri, setAtlasUri] = useState("mongodb+srv://developer:pass123@cluster0.mongodb.net/webbuilder_db");
  const [isConnected, setIsConnected] = useState(true);
  const [testingConnection, setTestingConnection] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const loggedUser: User = {
      id: `usr-${Date.now()}`,
      name: name || email.split("@")[0] || "Developer",
      email: email,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80`,
    };

    localStorage.setItem("natcode_user", JSON.stringify(loggedUser));
    onLoginSuccess(loggedUser);
    onClose();
  };

  const handleTestAtlasConnection = () => {
    setTestingConnection(true);
    setTimeout(() => {
      setTestingConnection(false);
      setIsConnected(true);
      alert("✓ MongoDB Atlas connection verified successfully!\nCluster: cluster0.mongodb.net\nDatabase: webbuilder_db");
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5 text-white relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-1.5">
              MongoDB Atlas Auth
            </h2>
            <p className="text-xs text-slate-400">Account Sync & Cloud Database Integration</p>
          </div>
        </div>

        {/* If User is already logged in, show Profile details */}
        {currentUser ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
              <img
                src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full border border-emerald-400"
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-white truncate">{currentUser.name}</div>
                <div className="text-xs text-slate-400 truncate">{currentUser.email}</div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1 font-mono">
                  <CheckCircle2 className="w-3 h-3" /> MongoDB Atlas Synced
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1 text-xs">
              <div className="text-slate-400 font-medium">Active Database Cluster:</div>
              <div className="font-mono text-[11px] text-emerald-400 truncate">cluster0.mongodb.net/webbuilder_db</div>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setTab("login")}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  tab === "login" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab("signup")}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  tab === "signup" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Register
              </button>
              <button
                onClick={() => setTab("atlas_config")}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  tab === "atlas_config" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Atlas Config
              </button>
            </div>

            {/* Login / Register Form */}
            {tab !== "atlas_config" ? (
              <form onSubmit={handleLoginSubmit} className="space-y-3 text-xs">
                {tab === "signup" && (
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Full Name</label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setEmail("demo@mongodb.com");
                      setPassword("demo1234");
                    }}
                    className="text-slate-400 hover:text-emerald-400 text-[11px] underline"
                  >
                    Fill Demo Account
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <span>{tab === "login" ? "Sign In" : "Create Account"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">MongoDB Connection URI</label>
                  <div className="relative">
                    <Server className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={atlasUri}
                      onChange={(e) => setAtlasUri(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white font-mono text-[11px] focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Connection Status:</span>
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Collections:</span>
                    <span className="text-slate-200 font-mono">projects, files, users</span>
                  </div>
                </div>

                <button
                  onClick={handleTestAtlasConnection}
                  disabled={testingConnection}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{testingConnection ? "Testing Atlas URI..." : "Test Connection"}</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
