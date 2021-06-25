const fileCategories = ['avatar', 'certificate'] as const

type FileCategory = typeof fileCategories[number]

export { fileCategories, FileCategory }