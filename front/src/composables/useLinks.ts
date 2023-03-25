import { useUserRole } from './useUserRole'
import { useUserLinks } from '~/stores/links/user'
import { useAdminLinks } from '~/stores/links/admin'
import { useVisitorLinks } from '~/stores/links/visitor'

export function useLinks() {
	const userLinks = useUserLinks()
	const AdminLinks = useAdminLinks()

	const visitorLinks = useVisitorLinks()
	const { isVisitor, isAdmin } = useUserRole()
	const allLinks = computed(() =>
		!isVisitor.value
			? !isAdmin.value
				? userLinks.value
				: AdminLinks.value
			: visitorLinks.value,
	)

	return {
		userLinks,
		visitorLinks,
		AdminLinks,
		allLinks,
	}
}
