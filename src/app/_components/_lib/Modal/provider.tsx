// TODO: Create a context provider for easily manging modals
// I prefer using context over zustand here as the state is component specific
"use client";
import { createContext, useState, useEffect, useContext } from "react";

type T = {
	activeModalSlug: string | null;
	isModalOpen: (slug: string) => boolean;
	openModal: (slug: string) => void;
	closeModal: (slug: string) => void;
	toggleModal: (slug: string) => void;
};

const ModalContext = createContext<T>({
	activeModalSlug: null,
	isModalOpen: (slug) => false,
	openModal: (slug) => {},
	closeModal: (slug) => {},
	toggleModal: (slug) => {},
});

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [activeModalSlug, setActiveModalSlug] = useState<string | null>(null);

	const isModalOpen = (slug: string) => slug === activeModalSlug;

	const openModal = (slug: string) => setActiveModalSlug(slug);

	const closeModal = (slug: string) => {
		if (activeModalSlug === slug) setActiveModalSlug(null);
	};

	const toggleModal = (slug: string) => {
		if (activeModalSlug !== slug) setActiveModalSlug(slug);
		else setActiveModalSlug(null);
	};

	return (
		<ModalContext.Provider
			value={{
				activeModalSlug,
				isModalOpen,
				openModal,
				closeModal,
				toggleModal,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = () => useContext(ModalContext);
