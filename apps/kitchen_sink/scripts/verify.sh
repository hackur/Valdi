#!/bin/bash
#
# Build Verification Script
# Checks that the Valdi Kitchen Sink app builds successfully
# Usage: ./scripts/verify.sh

set -e

echo "🔍 Valdi Kitchen Sink - Build Verification"
echo "=========================================="
echo ""

cd "$(dirname "$0")/../.."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track overall success
VERIFICATION_FAILED=0

# Step 1: Check Bazel is installed
echo "📦 Step 1/4: Checking Bazel installation..."
if command -v bazel &> /dev/null; then
    BAZEL_VERSION=$(bazel --version | head -n 1)
    echo -e "${GREEN}✓${NC} Bazel found: $BAZEL_VERSION"
else
    echo -e "${RED}✗${NC} Bazel not found! Please install Bazel."
    VERIFICATION_FAILED=1
fi
echo ""

# Step 2: Check directory structure
echo "📁 Step 2/4: Verifying directory structure..."
REQUIRED_DIRS=(
    "apps/kitchen_sink/modules/main_app"
    "apps/kitchen_sink/modules/common"
    "apps/kitchen_sink/modules/layouts_demo"
    "apps/kitchen_sink/modules/text_demo"
    "apps/kitchen_sink/modules/state_demo"
    "apps/kitchen_sink/modules/animation_demo"
)

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} Found: $dir"
    else
        echo -e "${RED}✗${NC} Missing: $dir"
        VERIFICATION_FAILED=1
    fi
done
echo ""

# Step 3: Verify BUILD.bazel files exist
echo "🏗️  Step 3/4: Checking BUILD.bazel files..."
BUILD_FILES=(
    "apps/kitchen_sink/BUILD.bazel"
    "apps/kitchen_sink/modules/main_app/BUILD.bazel"
    "apps/kitchen_sink/modules/common/BUILD.bazel"
)

for file in "${BUILD_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} Found: $file"
    else
        echo -e "${RED}✗${NC} Missing: $file"
        VERIFICATION_FAILED=1
    fi
done
echo ""

# Step 4: Attempt build (if previous checks passed)
if [ $VERIFICATION_FAILED -eq 0 ]; then
    echo "🔨 Step 4/4: Building iOS app..."
    echo ""

    START_TIME=$(date +%s)

    if bazel build //apps/kitchen_sink:kitchen_sink_ios; then
        END_TIME=$(date +%s)
        DURATION=$((END_TIME - START_TIME))

        echo ""
        echo -e "${GREEN}✓${NC} Build completed successfully in ${DURATION}s"
        echo ""

        # Check output file
        if [ -f "bazel-bin/apps/kitchen_sink/kitchen_sink_ios.ipa" ]; then
            IPA_SIZE=$(du -h "bazel-bin/apps/kitchen_sink/kitchen_sink_ios.ipa" | cut -f1)
            echo "📱 Output: bazel-bin/apps/kitchen_sink/kitchen_sink_ios.ipa (${IPA_SIZE})"
        fi
    else
        echo ""
        echo -e "${RED}✗${NC} Build failed!"
        VERIFICATION_FAILED=1
    fi
else
    echo -e "${YELLOW}⊘${NC} Skipping build due to previous errors"
fi

echo ""
echo "=========================================="

# Final summary
if [ $VERIFICATION_FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ VERIFICATION PASSED${NC}"
    echo ""
    echo "The app is ready to install:"
    echo "  npm run test:ios"
    exit 0
else
    echo -e "${RED}❌ VERIFICATION FAILED${NC}"
    echo ""
    echo "Please fix the errors above and try again."
    echo "See WORKFLOW.md for troubleshooting help."
    exit 1
fi
