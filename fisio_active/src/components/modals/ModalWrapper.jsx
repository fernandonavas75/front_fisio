import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * ModalWrapper
 *  - show      : boolean
 *  - title     : string
 *  - children  : contenido
 *  - onClose   : () => void
 */
export default function ModalWrapper({ show, title, children, onClose }) {
    /* Bloquear / restaurar scroll del <body> cuando el modal está abierto */
    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", show);
        return () => document.body.classList.remove("overflow-hidden");
    }, [show]);

    return (
        <AnimatePresence mode="wait">
            {show && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Ventana */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4"
                        initial={{ opacity: 0, y: -20, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.96 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                        <div
                            className="bg-white dark:bg-zinc-800 shadow-xl rounded-xl w-full max-w-4xl sm:max-h-[90vh] flex flex-col overflow-hidden"
                            onClick={(e) => e.stopPropagation()} // evita cerrar al hacer click dentro
                        >
                            {/* Header sticky */}
                            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 p-4 sticky top-0 bg-inherit z-10">
                                <h5 className="text-lg font-semibold m-0 dark:text-zinc-100">
                                    {title}
                                </h5>
                                <button
                                    className="btn-close btn-close-white dark:filter-none"
                                    onClick={onClose}
                                />
                            </div>

                            {/* Body desplazable */}
                            <div
                                className="p-4 overflow-y-scroll"
                                /* altura máxima => 90 vh menos ~64 px del header (ajusta si cambias el padding) */
                                style={{ maxHeight: "calc(90vh - 64px)" }}
                            >
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
