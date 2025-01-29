<template>
    <div class="reading-container">
        <h1 class="page-title">Reading</h1>

        <div class="reading-materials-wrapper">
            <h1 class="reading-materials-title">Click to any book to download or see it</h1>

            <div class="reading-material-container">
                <a v-for="(el, idx) in 15" :href="`/books/Cambridge IELTS ${idx + 1}.pdf`" target="_blank" class="reading-material">
                    <img :src="`/book-png/${idx + 1}.jpg`"/>
                    <!-- <span>Download Cambridge {{ idx + 1 }}</span> -->
                </a>
            </div>
        </div>
    </div>
</template>
<style src="~/assets/stylus/pages/reading.styl"></style>