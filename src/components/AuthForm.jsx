import React from "react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";

const AuthForm = ({
                      fields,
                      buttonLabel,
                      loading,
                      onSubmit,
                      footerText,
                      footerLink,
                      footerAction,
                  }) => {
    return (
        <form onSubmit={onSubmit} className="space-y-5">
            {fields.map((field, index) => (
                <div
                    key={index}
                    className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400"
                >
                    {field.icon === "mail" && <FiMail className="text-gray-500 mr-3" />}
                    {field.icon === "lock" && <FiLock className="text-gray-500 mr-3" />}
                    {field.icon === "user" && <FiUser className="text-gray-500 mr-3" />}

                    <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full outline-none text-gray-700"
                        required
                    />
                </div>
            ))}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition font-medium"
            >
                {loading ? "Processing..." : buttonLabel}
            </button>

            {footerText && (
                <p className="text-center text-sm mt-6 text-gray-500">
                    {footerText}{" "}
                    <span
                        onClick={footerAction}
                        className="text-blue-600 hover:underline cursor-pointer"
                    >
            {footerLink}
          </span>
                </p>
            )}
        </form>
    );
};

export default AuthForm;
