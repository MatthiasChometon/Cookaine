export function useUserRole() {
	const { connectedUser } = useConnectedUser()
	const isUser = computed(() => connectedUser.role === UserRoles.User)
	const isVisitor = computed(() => connectedUser.role === UserRoles.Visitor)
	const isAdmin = computed(() => connectedUser.role === UserRoles.Admin)

	return {
		isUser,
		isVisitor,
		isAdmin,
	}
}
