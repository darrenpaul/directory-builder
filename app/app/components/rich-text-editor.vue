<script setup lang="ts">
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import IconOrderedList from '~~/assets/icons/ordered-list.svg'
import IconUnorderedList from '~~/assets/icons/unordered-list.svg'

const props = defineProps({
	labelTitle: { type: String, required: true },
	labelDescription: { type: String, required: true },
	blogId: { type: String, required: false },
	blogSlug: { type: String, required: false },
})

const text = defineModel<string>()

const editor = useEditor({
	content: text.value,
	extensions: [
		TiptapStarterKit,
		Image,
		Link.configure({
			openOnClick: false,
			defaultProtocol: 'https',
		}),
	],
})

onBeforeUnmount(() => {
	unref(editor).destroy()
})

function onFocusOut() {
	text.value = editor.value.options.element.firstElementChild.innerHTML
}

const textFormatType = computed(() => {
	if (!editor.value) {
		return 'Paragraph'
	}

	if (editor.value.isActive('heading', { level: 1 })) {
		return 'Heading 1'
	}

	if (editor.value.isActive('heading', { level: 2 })) {
		return 'Heading 2'
	}

	if (editor.value.isActive('heading', { level: 3 })) {
		return 'Heading 3'
	}

	if (editor.value.isActive('heading', { level: 4 })) {
		return 'Heading 4'
	}

	if (editor.value.isActive('heading', { level: 5 })) {
		return 'Heading 5'
	}

	if (editor.value.isActive('heading', { level: 6 })) {
		return 'Heading 6'
	}

	if (editor.value.isActive('Code')) {
		return 'Code'
	}

	return 'Paragraph'
})

function setLink() {
	const previousUrl = editor.value.getAttributes('link').href
	const url = window.prompt('URL', previousUrl)
	// cancelled
	if (url === null) {
		return
	}
	// empty
	if (url === '') {
		editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
		return
	}
	// update link
	editor.value
		.chain()
		.focus()
		.extendMarkRange('link')
		.setLink({ href: url })
		.run()
}

function onImageUpdated(value: string) {
	if (editor.value && value) {
		editor.value.chain().focus().setImage({ src: value }).run()
	}
}
</script>

<template>
	<div>
		<div class="flex flex-col mb-3">
			<h1 class="text-lg font-semibold">
				{{ props.labelTitle }}
			</h1>

			<p class="text-neutral-400 text-sm">
				{{ props.labelDescription }}
			</p>
		</div>

		<div v-if="editor" class="flex gap-6 items-center mb-2">
			<RichTextImage
				v-if="props.blogId && props.blogSlug"
				:id="props.blogId"
				:slug="props.blogSlug"
				@updated="onImageUpdated"
			/>

			<div class="dropdown">
				<button tabindex="0" type="button" class="btn btn-sm">
					{{ textFormatType }}
				</button>

				<ul
					tabindex="0"
					class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
				>
					<li>
						<button
							class="capitalize"
							:class="
								editor.isActive('paragraph') ? 'font-bold' : 'font-normal'
							"
							@click="editor.chain().focus().setParagraph().run()"
						>
							paragraph
						</button>
					</li>

					<li>
						<button
							:class="
								editor.isActive('heading', { level: 1 })
									? 'font-bold'
									: 'font-normal'
							"
							@click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
						>
							h1
						</button>
					</li>

					<li>
						<button
							:class="
								editor.isActive('heading', { level: 2 })
									? 'font-bold'
									: 'font-normal'
							"
							@click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
						>
							h2
						</button>
					</li>

					<li>
						<button
							:class="
								editor.isActive('heading', { level: 3 })
									? 'font-bold'
									: 'font-normal'
							"
							@click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
						>
							h3
						</button>
					</li>

					<li>
						<button
							:class="
								editor.isActive('heading', { level: 4 })
									? 'font-bold'
									: 'font-normal'
							"
							@click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
						>
							h4
						</button>
					</li>

					<li>
						<button
							:class="
								editor.isActive('heading', { level: 5 })
									? 'font-bold'
									: 'font-normal'
							"
							@click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
						>
							h5
						</button>
					</li>

					<li>
						<button
							:class="
								editor.isActive('heading', { level: 6 })
									? 'font-bold'
									: 'font-normal'
							"
							@click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
						>
							h6
						</button>
					</li>

					<li>
						<button
							:class="editor.isActive('code') ? 'font-bold' : 'font-normal'"
							@click="editor.chain().focus().toggleCode().run()"
						>
							Code
						</button>
					</li>
				</ul>
			</div>

			<div class="flex gap-1">
				<button
					:disabled="!editor.can().chain().focus().toggleBold().run()"
					class="btn btn-sm font-bold"
					:class="editor.isActive('link') ? 'btn-neutral' : 'btn'"
					@click="setLink"
				>
					Link
				</button>
			</div>

			<div class="flex gap-1">
				<button
					:disabled="!editor.can().chain().focus().toggleBold().run()"
					class="btn btn-sm font-bold"
					:class="editor.isActive('bold') ? 'btn-neutral' : 'btn'"
					@click="editor.chain().focus().toggleBold().run()"
				>
					B
				</button>

				<button
					:disabled="!editor.can().chain().focus().toggleItalic().run()"
					class="btn btn-sm italic"
					:class="editor.isActive('italic') ? 'btn-neutral' : 'btn'"
					@click="editor.chain().focus().toggleItalic().run()"
				>
					i
				</button>

				<button
					:disabled="!editor.can().chain().focus().toggleStrike().run()"
					class="btn btn-sm line-through"
					:class="editor.isActive('strike') ? 'btn-neutral' : 'btn'"
					@click="editor.chain().focus().toggleStrike().run()"
				>
					S
				</button>
			</div>

			<div class="flex gap-1">
				<button
					class="btn btn-sm"
					:class="editor.isActive('bulletList') ? 'btn-neutral' : 'btn'"
					@click="editor.chain().focus().toggleBulletList().run()"
				>
					<IconUnorderedList :font-controlled="false" class="w-3" />
				</button>

				<button
					class="btn btn-sm"
					:class="editor.isActive('orderedList') ? 'btn-neutral' : 'btn'"
					@click="editor.chain().focus().toggleOrderedList().run()"
				>
					<IconOrderedList :font-controlled="false" class="w-3" />
				</button>
			</div>

			<div class="flex gap-1">
				<button
					class="btn btn-sm capitalize"
					:class="editor.isActive('codeBlock') ? 'btn-neutral' : 'btn'"
					@click="editor.chain().focus().toggleCodeBlock().run()"
				>
					code block
				</button>

				<button
					class="btn btn-sm capitalize"
					:class="editor.isActive('blockquote') ? 'btn-neutral' : 'btn'"
					@click="editor.chain().focus().toggleBlockquote().run()"
				>
					blockquote
				</button>

				<button
					class="btn btn-sm capitalize"
					@click="editor.chain().focus().setHorizontalRule().run()"
				>
					horizontal rule
				</button>

				<button
					class="btn btn-sm capitalize"
					@click="editor.chain().focus().setHardBreak().run()"
				>
					hard break
				</button>
			</div>

			<button
				class="btn btn-sm capitalize"
				@click="editor.chain().focus().unsetAllMarks().run()"
			>
				clear marks
			</button>

			<div class="flex gap-1">
				<button
					class="btn btn-sm capitalize"
					:disabled="!editor.can().chain().focus().undo().run()"
					@click="editor.chain().focus().undo().run()"
				>
					undo
				</button>

				<button
					class="btn btn-sm capitalize"
					:disabled="!editor.can().chain().focus().redo().run()"
					@click="editor.chain().focus().redo().run()"
				>
					redo
				</button>
			</div>
		</div>

		<TiptapEditorContent
			class="text-base border-2 border-neutral rounded-md"
			:editor="editor"
			@focusout="onFocusOut"
		/>
	</div>
</template>
