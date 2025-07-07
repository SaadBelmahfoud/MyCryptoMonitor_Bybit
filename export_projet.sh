#!/bin/bash

# Nom du fichier de sortie
OUTPUT_FILE="projet_export_complet_$(date +%Y%m%d_%H%M%S).txt"

{
    echo "=== EXPORT COMPLET DU PROJET ==="
    echo "Généré le $(date)"
    echo "Répertoire: $(pwd)"
    echo "--------------------------------"
    echo ""

    echo "=== ARBORESCENCE ==="
    if command -v tree &> /dev/null; then
        tree -a -I "node_modules|__pycache__|.git|.env*|.DS_Store|*.pyc"
    else
        find . -type d \( -name "node_modules" -o -name "__pycache__" -o -name ".git" -o -name ".env*" -o -name ".DS_Store" \) -prune -o -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'
    fi

    echo ""
    echo "=== CONTENU DES FICHIERS ==="
    find . -type d \( -name "node_modules" -o -name "__pycache__" -o -name ".git" -o -name ".env*" -o -name ".DS_Store" \) -prune -o -type f ! -name "*.pyc" -print | sort | while read -r file; do
        echo ""
        echo "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■"
        echo "■ FICHIER: $file"
        echo "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■"
        echo ""
        case "$file" in
            *.pdf|*.png|*.jpg|*.jpeg|*.gif|*.zip|*.tar*|*.so|*.pyc|*.db|*.sqlite)
                echo "[Fichier binaire - contenu non affiché]"
                ;;
            *)
                echo "=== Début du contenu ==="
                cat -n "$file" 2>/dev/null || echo "[Erreur de lecture]"
                echo "=== Fin du contenu ==="
                ;;
        esac
    done

    echo ""
    echo "=== FIN DE L'EXPORT ==="
    echo "Taille du projet: $(du -sh . | cut -f1)"
    echo "Fichiers analysés: $(find . -type f | wc -l)"
} > "$OUTPUT_FILE"

echo ""
echo "✅ Export terminé avec succès !"
echo "📄 Fichier généré: $(pwd)/$OUTPUT_FILE"
echo "📏 Taille du fichier: $(du -h "$OUTPUT_FILE" | cut -f1)"
