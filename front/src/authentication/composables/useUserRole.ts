import { UserRoles } from '~/enums/users/UserRoles'
import { useConnectedUser } from '~/stores/users/connected'

export function useUserRole() {
	const { connectedUser } = useConnectedUser()
	const isUser = computed(() => connectedUser.role === UserRoles.user)
	const isVisitor = computed(() => connectedUser.role === UserRoles.visitor)
	const isValidator = computed(() => connectedUser.role === UserRoles.validator)
	const isAdmin = computed(() => connectedUser.role === UserRoles.admin)

	return {
		isUser,
		isVisitor,
		isValidator,
		isAdmin,
	}
}
