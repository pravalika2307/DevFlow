"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Settings, Shield, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Workspace Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Configure integrations, permissions, and webhook parameters.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Nav list */}
        <div className="space-y-1">
          <button className="flex items-center gap-2.5 px-3 py-2 w-full rounded-lg text-sm font-medium bg-slate-900 text-white text-left">
            <Settings size={16} />
            General Settings
          </button>
          <button className="flex items-center gap-2.5 px-3 py-2 w-full rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900/40 text-left">
            <Shield size={16} />
            Security & RBAC
          </button>
          <button className="flex items-center gap-2.5 px-3 py-2 w-full rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900/40 text-left">
            <Bell size={16} />
            Notifications
          </button>
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-[#090d16]/30 border-slate-900">
            <CardHeader>
              <CardTitle className="text-base font-bold text-white">General Parameters</CardTitle>
              <CardDescription className="text-xs text-slate-400">Configure global workspace parameters and name.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                label="Workspace Name" 
                type="text" 
                defaultValue="DevFlow Core"
                className="w-full"
              />
              <Input 
                label="Default Sync Threshold (Days)" 
                type="number" 
                defaultValue="30"
                className="w-full"
              />
              <div className="flex justify-end pt-2">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
