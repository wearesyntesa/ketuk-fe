"use client";

import { useState } from "react";

export default function WarningEmail({email}: {email: string | undefined | null}) {
    const [showWarning, setShowWarning] = useState(true);
    if (email && email.includes("unesa.ac.id")) {
        return (
            <div>
                {showWarning && (
                    <div role="alert" className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md flex items-start gap-3 fixed bottom-4 right-4 max-w-sm shadow-md">
                        <div className="text-yellow-700 text-xl">⚠️</div>
                        <div className="flex-1">
                            <p className="font-medium text-sm text-yellow-800">Non-UNESA address detected</p>
                            <p className="text-xs text-yellow-700">
                                It looks like you're not using a UNESA email ({email}). Please sign in again with your UNESA email to access the dashboard.
                            </p>
                            <div className="mt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowWarning(false)}
                                    className="text-xs text-yellow-800 underline"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    } else {
        return (
            null
        )
    }

}